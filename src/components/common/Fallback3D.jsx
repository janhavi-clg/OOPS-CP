import React from 'react';

/**
 * Elegant SVG/CSS 3D geometric fallback rendered if WebGL is unavailable or disabled.
 * Adheres strictly to the DevTrack Coffee Brown & Cream palette.
 */
export const Fallback3D = () => {
  return (
    <div className="devtrack-fallback-3d" aria-hidden="true">
      <div className="fallback-scene-wrapper">
        {/* Concentric rotating orbital rings */}
        <div className="fallback-ring fallback-ring-outer"></div>
        <div className="fallback-ring fallback-ring-middle"></div>
        <div className="fallback-ring fallback-ring-inner"></div>

        {/* Central Geometric DevTrack Emblem */}
        <div className="fallback-core">
          <div className="fallback-cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>

        {/* Ambient developer nodes */}
        <div className="fallback-node node-1">
          <span>&lt;/&gt;</span>
        </div>
        <div className="fallback-node node-2">
          <span>OOP</span>
        </div>
        <div className="fallback-node node-3">
          <span>AI/ML</span>
        </div>
      </div>
    </div>
  );
};
