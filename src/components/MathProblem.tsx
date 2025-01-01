import React, { useState, useEffect } from 'react';
import { MathProblem as MathProblemType } from '../types/game';
import { generateProblem, calculateAnswer } from '../utils/mathUtils';

interface MathProblemProps {
  level: number;
  onSolve: (correct: boolean) => void;
}

export default function MathProblem({ level, onSolve }: MathProblemProps) {
  const [problem, setProblem] = useState<MathProblemType>(generateProblem(level));
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setProblem(generateProblem(level));
    setAnswer('');
    setFeedback('');
  }, [level]);

  const checkAnswer = () => {
    const correctAnswer = calculateAnswer(problem.num1, problem.num2, problem.operator);
    const isCorrect = parseInt(answer) === correctAnswer;
    
    setFeedback(isCorrect ? '✨ Correct!' : '❌ Try again!');
    onSolve(isCorrect);
    setTimeout(() => {
      setProblem(generateProblem(level));
      setAnswer('');
      setFeedback('');
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
      <div className="text-2xl font-bold mb-4 text-gray-800">
        {problem.num1} {problem.operator} {problem.num2} = ?
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              checkAnswer();
            }
          }}
        />
        <button
          onClick={checkAnswer}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Check
        </button>
      </div>
      {feedback && (
        <div className={`mt-2 ${feedback.includes('✨') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}