
import React from "react";
import { Question } from "../types/game";
import { motion } from "framer-motion";
import { Flower, CloudSun } from "lucide-react";

interface GameSceneProps {
  question: Question | undefined;
  options: number[];
  onSelectAnswer: (answer: number) => void;
  score: number;
  lives: number;
  level: number;
  catPosition: number;
  totalQuestions: number;
  currentQuestionIndex: number;
  isCorrect: boolean | null;
  selectedOption: number | null;
}

const GameScene: React.FC<GameSceneProps> = ({
  question,
  options,
  onSelectAnswer,
  score,
  lives,
  level,
  catPosition,
  totalQuestions,
  currentQuestionIndex,
  isCorrect,
  selectedOption
}) => {
  if (!question) return null;

  const treePositions = Array.from({ length: totalQuestions + 1 }, (_, i) => i);
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
  
  // Inversion de la position du chat : totalQuestions - catPosition pour que le chat descende
  // au lieu de monter avec l'augmentation de catPosition
  const displayCatPosition = totalQuestions - catPosition;

  // Couleurs pour les fleurs
  const flowerColors = ["#F97316", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-b from-blue-200 to-blue-50">
      {/* Soleil */}
      <motion.div 
        className="absolute top-10 right-10 text-yellow-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <CloudSun size={64} />
      </motion.div>

      {/* Header avec score et vies */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        <motion.div 
          className="card-game px-4 py-2 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-semibold text-game-primary mr-2">Niveau:</span>
          <span className="font-bold text-lg">{level}</span>
        </motion.div>
        
        <motion.div 
          className="card-game px-4 py-2 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="font-semibold text-game-primary mr-2">Score:</span>
          <span className="font-bold text-lg">{score}</span>
        </motion.div>
        
        <motion.div 
          className="card-game px-4 py-2 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="font-semibold text-game-primary mr-2">Vies:</span>
          <div className="flex">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-xl ${i < lives ? 'text-red-500' : 'text-gray-300'}`}>❤️</span>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scène de jeu avec arbre et chat */}
      <div className="relative flex-grow w-full max-w-4xl flex items-center justify-center py-8">
        {/* Arbre amélioré */}
        <motion.div 
          className="relative h-[450px] w-60 mx-auto"
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          {/* Tronc de l'arbre */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-[400px]">
            <div className="absolute bottom-0 w-24 h-[180px] bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-lg"></div>
            
            {/* Branches */}
            <div className="absolute bottom-[150px] left-[-12px] w-8 h-[60px] bg-amber-800 rotate-[-25deg] rounded-full"></div>
            <div className="absolute bottom-[200px] right-[-12px] w-8 h-[70px] bg-amber-800 rotate-[25deg] rounded-full"></div>
            <div className="absolute bottom-[250px] left-[-8px] w-6 h-[40px] bg-amber-800 rotate-[-15deg] rounded-full"></div>
            
            {/* Feuillage principal */}
            <div className="absolute bottom-[150px] w-[320px] h-[280px] -left-[150px] bg-gradient-to-t from-green-700 to-green-500 rounded-[50%]"></div>
            
            {/* Fleurs sur l'arbre */}
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                key={`flower-${index}`}
                className="absolute"
                style={{
                  left: `${-140 + Math.random() * 280}px`,
                  bottom: `${180 + Math.random() * 220}px`,
                  color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
                  transform: `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`,
                  zIndex: 2
                }}
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [`${Math.random() * 360}deg`, `${Math.random() * 360 + 10}deg`, `${Math.random() * 360}deg`]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Flower size={20} />
              </motion.div>
            ))}
          </div>
          
          {/* Positions sur l'arbre */}
          {treePositions.map((pos) => (
            <div 
              key={pos}
              className="absolute w-full flex items-center justify-center z-10"
              style={{ 
                bottom: `${pos * (400 / totalQuestions)}px`, 
                opacity: displayCatPosition === pos ? 1 : 0.5
              }}
            >
              <div className="w-4 h-1 bg-amber-600 rounded-full"></div>
            </div>
          ))}
          
          {/* Chat */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-24 h-24 z-20"
            style={{ bottom: `${displayCatPosition * (400 / totalQuestions)}px` }}
            initial={{ y: 0 }}
            animate={{ 
              y: isCorrect === true ? [0, -20, 0] : isCorrect === false ? [0, 10, 0] : 0,
              scale: isCorrect === true ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 1 }}
          >
            <div className="w-24 h-24 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-6xl">🐱</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Herbe au sol */}
        <div className="absolute bottom-0 w-full">
          <div className="relative h-20 overflow-hidden">
            {/* Première couche d'herbe */}
            <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-green-800 to-green-600 rounded-t-lg"></div>
            
            {/* Brins d'herbe individuels */}
            <div className="flex justify-center w-full">
              {Array.from({ length: 40 }).map((_, index) => (
                <motion.div
                  key={`grass-${index}`}
                  className="absolute bottom-6 w-3 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full"
                  style={{ 
                    height: `${10 + Math.random() * 30}px`,
                    left: `${index * 2.5}%`,
                    transformOrigin: 'bottom',
                    zIndex: Math.floor(Math.random() * 2)
                  }}
                  animate={{ rotate: [`${-2 + Math.random() * 4}deg`, `${2 + Math.random() * 4}deg`] }}
                  transition={{ 
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 0.5
                  }}
                />
              ))}
            </div>
            
            {/* Fleurs au sol */}
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={`ground-flower-${index}`}
                className="absolute bottom-6 z-10"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
                  transform: `rotate(${Math.random() * 20}deg) scale(${0.7 + Math.random() * 0.4})`
                }}
                animate={{ 
                  rotate: [`${-5 + Math.random() * 10}deg`, `${5 + Math.random() * 10}deg`] 
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                <Flower size={16} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Progression */}
      <div className="w-full max-w-lg mx-auto mb-4 z-10">
        <div className="bg-white rounded-full h-2 mb-2">
          <div 
            className="bg-game-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center text-sm text-gray-600">
          Question {currentQuestionIndex + 1} sur {totalQuestions}
        </div>
      </div>

      {/* Zone de question */}
      <motion.div 
        className="w-full max-w-2xl mx-auto card-game p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question.context && (
          <p className="text-lg mb-4 text-gray-700">{question.context}</p>
        )}
        <h2 className="text-2xl font-bold text-game-primary mb-6">{question.question}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option) => (
            <motion.button
              key={option}
              className={`option-button text-xl ${
                selectedOption === option
                  ? option === question.correctAnswer
                    ? "answer-correct"
                    : "answer-incorrect"
                  : ""
              }`}
              onClick={() => selectedOption === null && onSelectAnswer(option)}
              disabled={selectedOption !== null}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GameScene;
