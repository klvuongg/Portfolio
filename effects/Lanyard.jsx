'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import '@/css/Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ model, position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  console.log('Lanyard component received model:', model);
  
  return (
    <div className="lanyard-wrapper w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        {/* Add deterministic seed to Physics */}
        <Physics 
          gravity={gravity} 
          timeStep={1 / 60}
          numSolverIterations={4}
          numAdditionalFrictionIterations={1}
          erp={0.8}
          allowedLinearError={0.001}
        >
          <Suspense fallback={null}>
            <Band model={model}/>
          </Suspense>
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ model, maxSpeed = 50, minSpeed = 0 }) {
  console.log('Band component received model:', model, typeof model);
  
  // Validate model path before using useGLTF
  if (!model || typeof model !== 'string') {
    console.error('Invalid model path in Band:', model);
    return (
      <mesh>
        <boxGeometry args={[0.67, 1, 0.033]} />
        <meshBasicMaterial color="red" />
      </mesh>
    );
  }

  let nodes, materials;
  try {
    console.log('Attempting to load GLTF:', model);
    const gltf = useGLTF(model);
    nodes = gltf.nodes;
    materials = gltf.materials;
    console.log('GLTF loaded successfully:', { nodes: Object.keys(nodes || {}), materials: Object.keys(materials || {}) });
  } catch (error) {
    console.error('Error loading GLTF:', error);
    return (
      <mesh>
        <boxGeometry args={[0.67, 1, 0.033]} />
        <meshBasicMaterial color="orange" />
      </mesh>
    );
  }

  // Load the lanyard texture with error handling
  let lanyardTexture;
  try {
    lanyardTexture = useTexture('/assets/lanyard.png');
    console.log('Lanyard texture loaded successfully');
  } catch (error) {
    console.error('Error loading lanyard texture:', error);
    lanyardTexture = null;
  }

  // Create refs for all physics bodies
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  // Create vectors for calculations
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  // SOLUTION: More deterministic physics properties
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: true, 
    colliders: false, 
    angularDamping: 6, 
    linearDamping: 6,
    // Add consistent mass and inertia
    mass: 0.1,
    gravityScale: 1.0,
    // Ensure consistent sleeping thresholds
    sleepingLinearThreshold: 0.01,
    sleepingAngularThreshold: 0.01,
    // Add consistent restitution and friction
    restitution: 1.0,
    friction: 0.5
  };
  
  const [curve] = useState(() => 
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(), 
      new THREE.Vector3(), 
      new THREE.Vector3(), 
      new THREE.Vector3(),
      new THREE.Vector3()
    ])
  );
  
  // State for interaction
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  // Add state to track initialization
  const [isInitialized, setIsInitialized] = useState(false);

  // Physics joints with consistent parameters
  let rope1, rope2, rope3, spherical;
  try {
    // SOLUTION: Use consistent rope joint parameters
    const ropeParams = {
      stiffness: 100000,
      damping: 10000,
      maxForce: 100000
    };
    const ropeLength = 0.45; // Length of each rope segment
    
    rope1 = useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLength, ropeParams]);
    rope2 = useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLength, ropeParams]);
    rope3 = useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLength, ropeParams]);
    
    // Spherical joint with consistent parameters
    spherical = useSphericalJoint(j3, card, [
      [0, 0, 0], 
      [0, 2.55, 0],
      {
        stiffness: 1000000,
        damping: 50000,
        maxForce: 1000000
      }
    ]);
    console.log('Physics joints created successfully');
  } catch (error) {
    console.error('Error creating physics joints:', error);
  }

  // Handle cursor changes
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // SOLUTION: Initialize physics bodies to consistent positions after a delay
  useEffect(() => {
    if (!isInitialized) {
      const timer = setTimeout(() => {
        // Set consistent initial positions and velocities
        if (j1.current) {
          j1.current.setTranslation({ x: 0, y: 4.5, z: 0 });
          j1.current.setLinvel({ x: 0, y: 0, z: 0 });
          j1.current.setAngvel({ x: 0, y: 0, z: 0 });
        }
        if (j2.current) {
          j2.current.setTranslation({ x: 0, y: 3, z: 0 });
          j2.current.setLinvel({ x: 0, y: 0, z: 0 });
          j2.current.setAngvel({ x: 0, y: 0, z: 0 });
        }
        if (j3.current) {
          j3.current.setTranslation({ x: 0, y: 1.5, z: 0 });
          j3.current.setLinvel({ x: 0, y: 0, z: 0 });
          j3.current.setAngvel({ x: 0, y: 0, z: 0 });
        }
        if (card.current) {
          card.current.setTranslation({ x: 0, y: -1, z: 0 });
          card.current.setLinvel({ x: 0, y: 0, z: 0 });
          card.current.setAngvel({ x: 0, y: 0, z: 0 });
          card.current.setRotation({ x: 0, y: 0, z: 0, w: 1 });
        }
        setIsInitialized(true);
      }, 100); // Small delay to ensure physics world is ready

      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Animation frame
  useFrame((state, delta) => {
    // Only start physics interactions after initialization
    if (!isInitialized) return;
    if (ang.length() < 0.1 && !dragged) {
      card.current.setRotation({ x: 0, y: 0, z: 0, w: 1 });
    }

    // Handle dragging
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      // Wake up physics bodies
      [card, j1, j2, j3, fixed].forEach((ref) => {
        if (ref.current) ref.current.wakeUp();
      });
      
      if (card.current) {
        card.current.setNextKinematicTranslation({ 
          x: vec.x - dragged.x, 
          y: vec.y - dragged.y, 
          z: vec.z - dragged.z 
        });
      }
    }

    // Rope visualization
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // Update lerped positions for smooth rope
      [j1, j2, j3].forEach((ref) => {
        if (ref.current) {
          if (!ref.current.lerped) {
            ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
          }
          const clampedDistance = Math.max(0.1, Math.min(1, 
            ref.current.lerped.distanceTo(ref.current.translation())
          ));
          ref.current.lerped.lerp(
            ref.current.translation(), 
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          );
        }
      });
      
      // Update curve points
      if (j1.current.lerped && j2.current.lerped && j3.current.lerped) {
        const cardPos = new THREE.Vector3().copy(card.current.translation());
        cardPos.y += 2.2;
        
        curve.points[0].copy(fixed.current.translation());
        curve.points[1].copy(j1.current.lerped);
        curve.points[2].copy(j2.current.lerped);
        curve.points[3].copy(j3.current.lerped);
        curve.points[4].copy(cardPos);
        
        // Update rope geometry
        if (band.current.geometry && band.current.geometry.setPoints) {
          band.current.geometry.setPoints(curve.getPoints(64));
        }
        
        // Apply consistent rotational damping to card
        
      }
    }
  });

  // Set curve properties and texture wrapping
  curve.curveType = 'chordal';
  if (lanyardTexture) {
    lanyardTexture.wrapS = lanyardTexture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      <group position={[0, -0.5, 0]}>
        {/* Fixed anchor point */}
        <RigidBody ref={fixed} position={[0, 4.5, 0]} type="fixed" />
        
        {/* SOLUTION: Use consistent initial positions */}
        <RigidBody position={[0, 2.5, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.05]} restitution={0.8}/>
        </RigidBody>
        
        <RigidBody position={[0, 2, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.05]} restitution={0.8}/>
        </RigidBody>
        
        <RigidBody position={[0, 1, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.05]} restitution={0.8}/>
        </RigidBody>
        
        {/* Card with consistent initial position */}
        <RigidBody 
          position={[0, -1, 0]} 
          ref={card} 
          {...segmentProps}
          angularDamping={18}  // Increase
          linearDamping={12}    // Increase
          mass={0.5} // Heavier card for more stability
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[1.6, 2.25, 0.02]} restitution={0.8} />
          <group
            scale={3}
            position={[0, -2, 1.6]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              if (e.target.releasePointerCapture) {
                e.target.releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={(e) => {
              if (e.target.setPointerCapture) {
                e.target.setPointerCapture(e.pointerId);
              }
              if (card.current) {
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              }
            }}
          >
            {/* Render card components with better fallbacks */}
            {nodes?.card ? (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial 
                  map={materials?.base?.map} 
                  map-anisotropy={16} 
                  clearcoat={1} 
                  clearcoatRoughness={0.15} 
                  roughness={0.9} 
                  metalness={0.8} 
                />
              </mesh>
            ) : (
              <mesh>
                <boxGeometry args={[1.6, 2.25, 0.02]} />
                <meshStandardMaterial color="#4a5568" roughness={0.8} />
              </mesh>
            )}
            
            {nodes?.clip && materials?.metal && (
              <mesh 
                geometry={nodes.clip.geometry} 
                material={materials.metal} 
                material-roughness={0.3} 
              />
            )}
            
            {nodes?.clamp && materials?.metal && (
              <mesh 
                geometry={nodes.clamp.geometry} 
                material={materials.metal} 
              />
            )}
          </group>
        </RigidBody>
      </group>
      
      {/* Rope visualization */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap={lanyardTexture ? true : false}
          map={lanyardTexture}
          repeat={[-4, 1]}
          lineWidth={1.3}
        />
      </mesh>
    </>
  );
}

// Preload the GLTF files and texture
useGLTF.preload('/assets/card_language.glb');
useGLTF.preload('/assets/card_database.glb');
useGLTF.preload('/assets/card_operating_system.glb');
useGLTF.preload('/assets/card_other_tools.glb');
useTexture.preload('/assets/lanyard.png');