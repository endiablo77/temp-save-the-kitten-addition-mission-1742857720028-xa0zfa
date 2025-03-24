
import React, { useState, useEffect } from "react";
import { GameState } from "../types/game";
import { gameLevels, gameSounds, saveScore, generateId, shuffleArray } from "../utils/gameData";
import LevelIntro from "./LevelIntro";
import GameScene from "./GameScene";
import GameOver from "./GameOver";
import LevelComplete from "./LevelComplete";
import Tutorial from "./Tutorial";

const CatRescueGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    currentQuestion: 0,
    score: 0,
    catPosition: 0, // Le chat commence en bas de l'arbre (position 0)
    lives: 3,
    levelCompleted: false,
    gameOver: false,
    showTutorial: true
  });

  const [showLevelIntro, setShowLevelIntro] = useState(true);
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentLevel = gameLevels.find(level => level.id === gameState.currentLevel);
  const currentQuestion = currentLevel?.questions[gameState.currentQuestion];

  useEffect(() => {
    if (currentQuestion) {
      setShuffledOptions(shuffleArray(currentQuestion.options));
    }
  }, [currentQuestion]);

  const handleAnswer = (selectedAnswer: number) => {
    setSelectedOption(selectedAnswer);
    const correct = selectedAnswer === currentQuestion?.correctAnswer;
    setIsCorrect(correct);

    setTimeout(() => {
      if (correct) {
        gameSounds.correct.play().catch(e => console.log("Audio error:", e));
        handleCorrectAnswer();
      } else {
        gameSounds.incorrect.play().catch(e => console.log("Audio error:", e));
        handleIncorrectAnswer();
      }
    }, 1000);
  };

  const handleCorrectAnswer = () => {
    const updatedScore = gameState.score + 1000;
    const updatedCatPosition = gameState.catPosition + 1; // Augmenter la position fait que le chat descend
    
    // Jouer le miaulement quand le chat descend
    gameSounds.catMeow.play().catch(e => console.log("Audio error:", e));
    
    // Vérifier si toutes les questions du niveau sont complétées
    if (gameState.currentQuestion >= (currentLevel?.questions.length || 0) - 1) {
      // Niveau terminé
      const levelBonus = gameState.lives === 3 ? 2000 : 0;
      const finalScore = updatedScore + levelBonus;
      
      setGameState(prev => ({
        ...prev,
        score: finalScore,
        catPosition: updatedCatPosition,
        levelCompleted: true
      }));

      gameSounds.levelComplete.play().catch(e => console.log("Audio error:", e));
    } else {
      // Passer à la question suivante
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        score: updatedScore,
        catPosition: updatedCatPosition
      }));
    }
    
    setIsCorrect(null);
    setSelectedOption(null);
  };

  const handleIncorrectAnswer = () => {
    const updatedLives = gameState.lives - 1;
    const updatedScore = Math.max(0, gameState.score - 500);
    const updatedCatPosition = Math.max(0, gameState.catPosition - 1); // Diminuer la position fait que le chat remonte
    
    if (updatedLives <= 0) {
      // Partie terminée
      setGameState(prev => ({
        ...prev,
        lives: updatedLives,
        score: updatedScore,
        catPosition: updatedCatPosition,
        gameOver: true
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        lives: updatedLives,
        score: updatedScore,
        catPosition: updatedCatPosition
      }));
    }
    
    setIsCorrect(null);
    setSelectedOption(null);
  };

  const startLevel = () => {
    setShowLevelIntro(false);
  };

  const nextLevel = () => {
    if (gameState.currentLevel < gameLevels.length) {
      setGameState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        currentQuestion: 0,
        levelCompleted: false,
        catPosition: 0
      }));
      setShowLevelIntro(true);
    } else {
      // Tous les niveaux complétés, fin du jeu
      gameSounds.gameComplete.play().catch(e => console.log("Audio error:", e));
      
      // Sauvegarder le score
      if (gameState.username) {
        saveScore({
          id: generateId(),
          username: gameState.username,
          avatar: gameState.avatar,
          score: gameState.score,
          level: gameState.currentLevel,
          date: new Date().toISOString()
        });
      }
      
      setGameState(prev => ({
        ...prev,
        gameOver: true
      }));
    }
  };

  const restartGame = () => {
    setGameState({
      currentLevel: 1,
      currentQuestion: 0,
      score: 0,
      catPosition: 0,
      username: gameState.username,
      avatar: gameState.avatar,
      lives: 3,
      levelCompleted: false,
      gameOver: false,
      showTutorial: false
    });
    setShowLevelIntro(true);
  };

  const setPlayerInfo = (username: string, avatar: string) => {
    setGameState(prev => ({
      ...prev,
      username,
      avatar
    }));
  };

  const closeTutorial = () => {
    setGameState(prev => ({
      ...prev,
      showTutorial: false
    }));
  };

  if (gameState.showTutorial) {
    return <Tutorial onClose={closeTutorial} />;
  }

  if (gameState.gameOver) {
    return (
      <GameOver 
        score={gameState.score} 
        onRestart={restartGame}
        username={gameState.username}
        setPlayerInfo={setPlayerInfo}
      />
    );
  }

  if (gameState.levelCompleted) {
    return (
      <LevelComplete 
        level={gameState.currentLevel}
        score={gameState.score}
        onNextLevel={nextLevel}
      />
    );
  }

  if (showLevelIntro && currentLevel) {
    return (
      <LevelIntro 
        level={currentLevel} 
        onStart={startLevel} 
      />
    );
  }

  return (
    <GameScene
      question={currentQuestion}
      options={shuffledOptions}
      onSelectAnswer={handleAnswer}
      score={gameState.score}
      lives={gameState.lives}
      level={gameState.currentLevel}
      catPosition={gameState.catPosition}
      totalQuestions={currentLevel?.questions.length || 0}
      currentQuestionIndex={gameState.currentQuestion}
      isCorrect={isCorrect}
      selectedOption={selectedOption}
    />
  );
};

export default CatRescueGame;
