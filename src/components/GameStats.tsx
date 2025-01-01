import React from 'react';
import { Brain, Heart, Star } from 'lucide-react';

interface GameStatsProps {
  score: number;
  lives: number;
  level: number;
}

export default function GameStats({ score, lives, level }: GameStatsProps) {
  return (
    <div className="absolute top-4 left-4 flex items-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6" />
        <span className="text-xl font-bold">{score}</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500" />
        <span className="text-xl font-bold">{lives}</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-400" />
        <span className="text-xl font-bold">Level {level}</span>
      </div>
    </div>
  );
}