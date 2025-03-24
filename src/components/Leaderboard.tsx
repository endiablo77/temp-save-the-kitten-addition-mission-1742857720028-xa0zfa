
import React from "react";
import { motion } from "framer-motion";
import { getTopScores } from "../utils/gameData";

interface LeaderboardProps {
  onBack: () => void;
  playerName?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, playerName }) => {
  const topScores = getTopScores(10);
  
  return (
    <motion.div
      className="w-full max-w-2xl card-game p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center text-game-primary mb-6">Classement</h1>
      
      <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rang
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joueur
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Niveau
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topScores.map((score, index) => (
              <motion.tr 
                key={score.id}
                className={`${score.username === playerName ? "bg-blue-50" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                      index === 0 ? "bg-yellow-100 text-yellow-600" : 
                      index === 1 ? "bg-gray-100 text-gray-600" : 
                      index === 2 ? "bg-amber-100 text-amber-600" : 
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                      {score.avatar || "😺"}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {score.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{score.level}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-game-accent">
                  {score.score}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center">
        <motion.button 
          className="btn-game btn-primary flex items-center"
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
