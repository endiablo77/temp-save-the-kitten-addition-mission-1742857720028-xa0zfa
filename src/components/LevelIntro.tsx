
import React from "react";
import { Level } from "../types/game";
import { motion } from "framer-motion";

interface LevelIntroProps {
  level: Level;
  onStart: () => void;
}

const LevelIntro: React.FC<LevelIntroProps> = ({ level, onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-blue-100">
      <motion.div 
        className="w-full max-w-3xl card-game p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-game-primary mb-2">Niveau {level.id}</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">{level.name}</h2>
          
          <div className="h-1 w-32 bg-game-secondary rounded-full mb-6"></div>
          
          <p className="text-lg text-gray-600 mb-8">{level.description}</p>
          
          <div className="bg-blue-50 border-l-4 border-game-primary p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-semibold text-game-primary mb-3">À savoir avant de commencer :</h3>
            <p className="text-gray-700">{level.introduction}</p>
          </div>

          <div className="flex items-center mb-6">
            <div className="text-5xl mr-4">🐱</div>
            <div className="bg-gray-100 p-4 rounded-lg relative">
              <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gray-100 border-b-8 border-b-transparent"></div>
              <p className="text-gray-700">Aide-moi à descendre de l'arbre en répondant correctement aux additions !</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <motion.button 
              className="btn-game btn-primary flex items-center text-lg"
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">Commencer le niveau</span>
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

export default LevelIntro;
