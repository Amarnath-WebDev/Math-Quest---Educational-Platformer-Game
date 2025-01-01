import React, { useState } from 'react';
import { User, LogOut, Edit } from 'lucide-react';

interface UserProfileProps {
  username: string;
  onEditName: () => void;
  onLogout: () => void;
}

export default function UserProfile({ username, onEditName, onLogout }: UserProfileProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 
                   cursor-pointer transition-all duration-200 backdrop-blur-sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-medium">{username}</span>
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {
              onEditName();
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Name
          </button>
          <button
            onClick={() => {
              onLogout();
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}