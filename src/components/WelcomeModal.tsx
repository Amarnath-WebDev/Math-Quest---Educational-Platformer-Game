import React, { useState } from 'react';
import { User } from 'lucide-react';

interface WelcomeModalProps {
  onSubmit: (name: string) => void;
}

export default function WelcomeModal({ onSubmit }: WelcomeModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.length < 2 || name.length > 20) {
      setError('Name must be between 2 and 20 characters');
      return;
    }
    
    onSubmit(name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl transform transition-all">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Math Quest!</h2>
          <p className="text-gray-600">Enter your name to begin your mathematical adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-blue-600 transform transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}