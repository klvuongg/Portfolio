import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

const Lanyard = dynamic(() => import('@/effects/Lanyard'), { 
  ssr: false,
  loading: () => <div className="w-full h-80 flex items-center justify-center">Loading...</div>
})

// Fallback component for loading errors
const LanyardFallback = ({ title }) => (
  <div className="w-full h-80 max-w-sm relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
    <div className="text-center">
      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-4"></div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  </div>
)

const Tools = () => {
  const cardData = [
    { model: '/assets/card_language.glb', title: 'Programming Languages' },
    { model: '/assets/card_database.glb', title: 'Databases' },
    { model: '/assets/card_operating_system.glb', title: 'Operating Systems' },
    { model: '/assets/card_other_tools.glb', title: 'Other Tools' }
  ]

  return (
    <section id="tools" className="w-full max-w-8xl mx-auto px-[8%] py-40 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Programming Languages and Tools I Use
      </h4>
      <h2 className="text-center text-5xl font-Ovo">My Tools</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        These lanyard cards showcase key tools and technologies I use in 3D interactive form.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {cardData.map((card, index) => (
          <div key={index} className="w-full min-h-[30rem] max-w-lg relative">
            <Suspense fallback={<LanyardFallback title={card.title} />}>
              <ErrorBoundary fallback={<LanyardFallback title={card.title} />}>
                {card.model ? (
                  <Lanyard 
                    model={card.model} 
                    position={[0, 0, -8]} 
                    gravity={[0, -20, 0]}
                    fov={25}
                  />
                ) : (
                  <LanyardFallback title={card.title} />
                )}
              </ErrorBoundary>
            </Suspense>
          </div>
        ))}
      </div>
    </section>
  )
}

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lanyard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default Tools