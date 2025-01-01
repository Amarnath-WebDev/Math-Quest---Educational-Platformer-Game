import React, { useState, useEffect } from 'react';
import Player from './Player';
import MathProblem from './MathProblem';
import Platform from './Platform';
import GameStats from './GameStats';
import GameOver from './GameOver';
import WelcomeModal from './WelcomeModal';
import UserProfile from './UserProfile';
import { GameState, GameHistory } from '../types/game';
import { saveGameHistory, getGameHistory } from '../utils/storage';
import { saveUsername, getUsername, clearUsername } from '../utils/userStorage';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    history: getGameHistory()
  });
  const [isJumping, setIsJumping] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const [username, setUsername] = useState<string | null>(getUsername());
  const [showWelcome, setShowWelcome] = useState(!getUsername());

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNameSubmit = (name: string) => {
    setUsername(name);
    saveUsername(name);
    setShowWelcome(false);
  };

  const handleEditName = () => {
    setShowWelcome(true);
  };

  const handleLogout = () => {
    clearUsername();
    setUsername(null);
    setShowWelcome(true);
    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      history: getGameHistory()
    });
  };

  const handleSolveProblem = (correct: boolean) => {
    setGameState(prev => {
      const newScore = correct ? prev.score + 100 : prev.score;
      const newLives = correct ? prev.lives : prev.lives - 1;
      const newLevel = newScore >= prev.level * 500 ? prev.level + 1 : prev.level;

      if (newLives <= 0) {
        const newHistory: GameHistory = {
          timestamp: Date.now(),
          score: newScore,
          level: newLevel,
          date: new Date().toLocaleDateString()
        };
        saveGameHistory(newHistory);
        return { ...prev, lives: newLives, history: [newHistory, ...prev.history] };
      }

      return { ...prev, score: newScore, lives: newLives, level: newLevel };
    });
  };

  const handleRestart = () => {
    setGameState(prev => ({
      score: 0,
      lives: 3,
      level: 1,
      history: prev.history
    }));
  };

  if (showWelcome) {
    return <WelcomeModal onSubmit={handleNameSubmit} />;
  }

  if (gameState.lives <= 0) {
    return (
      <GameOver
        score={gameState.score}
        onRestart={handleRestart}
        history={gameState.history}
      />
    );
  }

  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-200 to-blue-400 overflow-hidden">
      <nav className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <GameStats
          score={gameState.score}
          lives={gameState.lives}
          level={gameState.level}
        />
        <div className="ml-auto">
          {username && (
            <UserProfile
              username={username}
              onEditName={handleEditName}
              onLogout={handleLogout}
            />
          )}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full">
        <Platform />
      </div>

      <Player position={position} isJumping={isJumping} />
      
      <div className="absolute top-1/3 right-1/4">
        <MathProblem level={gameState.level} onSolve={handleSolveProblem} />
      </div>
    </div>
  );
}