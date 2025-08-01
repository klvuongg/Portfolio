import { useState } from "react";
import "@/css/Folder.css";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder = ({
  color = "#5227FF",
  size = 0.33,
  items = [],
  className = "",
  isOpen = false,
  onToggle = () => {},
  onPaperHover = () => {},
  onPaperLeave = () => {},
  hoveredIndex = null,
}) => {
  const maxItems = 4; // Changed to 4 to support 4 cards
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const open = isOpen;
  
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";
  const paper4 = darkenColor("#ffffff", 0.02);

  const handleClick = () => {
    onToggle();
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseEnter = (index) => {
    onPaperHover(index);
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
    onPaperLeave();
  };

  // Function to get dynamic paper class based on hover state
  const getPaperClassName = (index) => {
    const baseClass = `paper paper-${index + 1}`;
    
    // If this paper is being hovered (either directly or via card hover)
    if (hoveredIndex === index) {
      return `${baseClass} paper-hovered`;
    }
    
    return baseClass;
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
    "--paper-4": paper4,
  };

  const folderClassName = `folder ${open ? "open" : ""}`.trim();
  const scale = isOpen ? size : 1;
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onClick={handleClick}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={getPaperClassName(i)}
              onMouseMove={(e) => handlePaperMouseMove(e, i)}
              onMouseEnter={() => handlePaperMouseEnter(i)}
              onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
              style={
                open
                  ? ({
                    "--magnet-x": `${paperOffsets[i]?.x || 0}px`,
                    "--magnet-y": `${paperOffsets[i]?.y || 0}px`,
                  })
                  : {}
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;