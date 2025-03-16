"use client";

import React from "react";

interface Player {
  name: string;
  totalGoals: number;
  matchesPlayed: number;
  goalsPerMatch: number;
  goalPercentage: number;
}

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ⚽ {player.name}
        </h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-lg font-semibold">{player.totalGoals}</p>
            <p className="text-sm text-gray-400">🔥 Buts marqués</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-lg font-semibold">{player.matchesPlayed}</p>
            <p className="text-sm text-gray-400">✅ Matchs joués</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-lg font-semibold">
              {player.goalsPerMatch.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">🎯 Buts/match</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-lg font-semibold">
              {player.goalPercentage.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-400">% Buts marqués</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default PlayerModal;
