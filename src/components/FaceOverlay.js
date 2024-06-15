
import React from 'react';
import '../index.css';

const FaceOverlay = ({ faces }) => {
  return (
    <div className="face-overlay">
      {faces.map((face, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            border: '2px solid red',
            left: `${face.x}px`,
            top: `${face.y}px`,
            width: `${face.width}px`,
            height: `${face.height}px`
          }}
        />
      ))}
    </div>
  );
};

export default FaceOverlay;
