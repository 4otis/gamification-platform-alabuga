import React, { useEffect, useState } from 'react';
import './ProgressBar.css';
import ElectricBorder from '../../../shared/components/ElectricBorder/ElectricBorder';

const ProgressBar = ({ 
  startColor = "#0099ffff", 
  endColor = "#00ffcc",
  initialProgress = 0 
}) => {
  const progress = initialProgress;

  return (
    <div className="progress-bar-container">
        {/* <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.4}
            thickness={10}
            style={{ borderRadius: 16 }}
        >
            <div 
                className="progress-bar"
                style={{ 
                width: `${parseInt(parseFloat(progress)/initialProgress * 100)}%`,
                background: `linear-gradient(90deg, ${startColor}, ${endColor})`
                }}
            ></div>
        </ElectricBorder> */}
    </div>
  );
};

export default ProgressBar;