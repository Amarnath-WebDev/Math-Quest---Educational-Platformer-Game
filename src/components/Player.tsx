import React from 'react';

interface PlayerProps {
  position: { x: number; y: number };
  isJumping: boolean;
}

export default function Player({ position, isJumping }: PlayerProps) {
  return (
    <div
      className={`absolute transition-all duration-500 ${
        isJumping ? 'transform -translate-y-32' : ''
      }`}
      style={{ left: `${position.x}px`, bottom: `${100 + position.y}px` }}
    >
      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}