
import React from "react";
import { motion } from "framer-motion";

interface LevelCompleteProps {
  level: number;
  score: number;
  onNextLevel: () => void;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ level, score, onNextLevel }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-blue-100">
      <motion.div 
        className="w-full max-w-2xl card-game p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-full flex justify-center mb-6">
            <motion.div 
              className="text-7xl"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1.5 }}
            >
              🎉
            </motion.div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-game-primary mb-2">Niveau {level} Terminé!</h1>
          <div className="h-1 w-32 bg-game-secondary mx-auto rounded-full my-6"></div>
          
          <p className="text-xl text-gray-600 mb-8">
            Bravo! Tu as réussi à aider le chaton à descendre et tu as gagné beaucoup de points!
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 inline-block mb-8">
            <h3 className="text-xl font-semibold text-game-primary mb-2">Score Total</h3>
            <p className="text-3xl font-bold text-game-accent">{score} points</p>
          </div>
          
          <div className="flex justify-center mt-6">
            <motion.div 
              className="text-6xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🐱
            </motion.div>
          </div>
          
          <p className="text-lg text-gray-600 mt-4 mb-8">
            Le chaton est très content! Il ronronne de bonheur grâce à toi!
          </p>
          
          <div className="flex justify-center">
            <motion.button 
              className="btn-game btn-accent flex items-center text-lg"
              onClick={onNextLevel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">Continuer l'aventure</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LevelComplete;
