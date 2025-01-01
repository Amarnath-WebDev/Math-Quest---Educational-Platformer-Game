export interface GameState {
  score: number;
  lives: number;
  level: number;
  history: GameHistory[];
}

export interface GameHistory {
  timestamp: number;
  score: number;
  level: number;
  date: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface MathProblem {
  num1: number;
  num2: number;
  operator: string;
}