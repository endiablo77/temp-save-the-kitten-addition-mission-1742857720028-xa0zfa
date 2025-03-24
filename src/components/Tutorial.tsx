import React from "react";
import { motion } from "framer-motion";

interface TutorialProps {
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-blue-50 to-blue-100">
      <motion.div 
        className="w-full max-w-3xl card-game p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="text-7xl animate-bounce-slight">🐱</div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-center text-game-primary mb-4">
            Sauve le chaton : Mission Addition !
          </h1>
          
          <div className="h-1 w-32 bg-game-secondary mx-auto rounded-full mb-6"></div>
          
          <p className="text-lg text-center text-gray-600 mb-8">
            Un adorable chaton est coincé dans un arbre et a besoin de ton aide pour descendre !
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🧮</div>
              <h3 className="text-xl font-semibold text-game-primary mb-2">Résous des additions</h3>
              <p className="text-gray-600">
                Réponds correctement aux questions d'addition pour aider le chaton à descendre de l'arbre.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-game-primary mb-2">Gagne des points</h3>
              <p className="text-gray-600">
                Chaque bonne réponse te rapporte 1000 points. Fais attention : les erreurs coûtent 500 points !
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-game-primary mb-2">Termine les niveaux</h3>
              <p className="text-gray-600">
                Progresse à travers 3 niveaux de difficulté croissante pour devenir un champion des additions !
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-game-primary p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-semibold text-game-primary mb-3">Comment jouer :</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Lis attentivement la question d'addition</li>
              <li>Choisis la bonne réponse parmi les options proposées</li>
              <li>Pour chaque bonne réponse, le chaton descend d'un niveau</li>
              <li>Pour chaque erreur, le chaton remonte ou reste bloqué</li>
              <li>Tu as 3 vies pour chaque niveau</li>
            </ul>
          </div>
          
          <div className="flex justify-center mt-8">
            <motion.button 
              className="btn-game btn-accent text-lg px-10 py-4 shadow-lg"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer l'aventure !
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tutorial;
