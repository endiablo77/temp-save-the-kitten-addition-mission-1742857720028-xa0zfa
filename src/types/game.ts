
export interface Question {
  id: number;
  question: string;
  options: number[];
  correctAnswer: number;
  context?: string;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  introduction: string;
  questions: Question[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  totalScore: number;
  levelScores: {
    [key: number]: number;
  };
}

export interface GameState {
  currentLevel: number;
  currentQuestion: number;
  score: number;
  catPosition: number;
  username?: string;
  avatar?: string;
  lives: number;
  levelCompleted: boolean;
  gameOver: boolean;
  showTutorial: boolean;
}

export interface ScoreRecord {
  id: string;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  date: string;
}
