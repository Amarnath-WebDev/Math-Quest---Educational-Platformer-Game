import { GameHistory } from '../types/game';

const HISTORY_KEY = 'mathquest_history';

export const saveGameHistory = (history: GameHistory) => {
  const savedHistory = getGameHistory();
  const updatedHistory = [history, ...savedHistory].slice(0, 10); // Keep last 10 games
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const getGameHistory = (): GameHistory[] => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};