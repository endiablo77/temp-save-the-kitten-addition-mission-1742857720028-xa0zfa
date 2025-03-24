
import React, { useState } from "react";
import { motion } from "framer-motion";
import Leaderboard from "./Leaderboard";
import { saveUserProfile } from "../utils/gameData";

interface GameOverProps {
  score: number;
  onRestart: () => void;
  username?: string;
  setPlayerInfo: (name: string, avatar: string) => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart, username, setPlayerInfo }) => {
  const [name, setName] = useState(username || "");
  const [avatar, setAvatar] = useState("😺");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [saved, setSaved] = useState(false);

  const avatars = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🐱"];

  const handleSaveScore = () => {
    if (name.trim()) {
      saveUserProfile(name, avatar);
      setPlayerInfo(name, avatar);
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-blue-100">
      {!showLeaderboard ? (
        <motion.div 
          className="w-full max-w-2xl card-game p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-game-primary mb-4">
            {score > 0 ? "Félicitations !" : "Partie terminée !"}
          </h1>
          
          <div className="h-1 w-32 bg-game-secondary mx-auto rounded-full mb-6"></div>
          
          <div className="flex justify-center mb-6">
            <motion.div 
              className="text-7xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {score > 0 ? "🐱" : "😿"}
            </motion.div>
          </div>
          
          <p className="text-xl text-center text-gray-600 mb-8">
            {score > 0 
              ? "Bravo ! Tu as sauvé le chaton et gagné beaucoup de points !" 
              : "Oh non ! Le chaton est toujours dans l'arbre. Essaie encore !"}
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center mb-8">
            <h3 className="text-xl font-semibold text-game-primary mb-2">Ton score</h3>
            <p className="text-3xl font-bold text-game-accent">{score} points</p>
          </div>
          
          {!saved && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-center text-game-primary mb-4">Enregistre ton score !</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ton prénom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-game-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entre ton prénom ici"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Choisis ton avatar</label>
                <div className="grid grid-cols-5 gap-2">
                  {avatars.map((emoji) => (
                    <button
                      key={emoji}
                      className={`p-2 text-2xl rounded-lg transition-all ${
                        avatar === emoji ? "bg-game-primary-light ring-2 ring-game-primary" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => setAvatar(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              <motion.button
                className="w-full btn-game btn-primary mb-4"
                onClick={handleSaveScore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!name.trim()}
              >
                Sauvegarder mon score
              </motion.button>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="btn-game btn-secondary flex-1 flex justify-center items-center"
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Rejouer
            </motion.button>
            
            <motion.button 
              className="btn-game bg-game-primary-light flex-1 flex justify-center items-center"
              onClick={() => setShowLeaderboard(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Classement
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <Leaderboard onBack={() => setShowLeaderboard(false)} playerName={name} />
      )}
    </div>
  );
};

export default GameOver;
