import React from 'react';
import { GameHistory } from '../types/game';
import { Trophy, Clock, Star } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  history: GameHistory[];
}

export default function GameOver({ score, onRestart, history }: GameOverProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-50 to-red-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">Game Over!</h1>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <p className="text-2xl font-bold">Score: {score}</p>
        </div>
        
        {history.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Best Games</h2>
            <div className="space-y-2">
              {history.slice(0, 3).map((game, index) => (
                <div key={game.timestamp} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">#{index + 1}</span>
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{game.score}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {game.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={onRestart}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}