
import { Level, Question, ScoreRecord } from "../types/game";

// Niveaux du jeu
export const gameLevels: Level[] = [
  {
    id: 1,
    name: "Les bases de l'addition",
    description: "Additionne des nombres simples allant de 1 à 5.",
    introduction: "Dans ce niveau, tu vas apprendre à additionner des petits nombres. Quand on additionne, on met ensemble deux groupes de choses pour savoir combien il y en a en tout.",
    questions: [
      {
        id: 1,
        question: "1 + 2 = ?",
        options: [2, 3, 4],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "3 + 1 = ?",
        options: [3, 4, 5],
        correctAnswer: 4
      },
      {
        id: 3,
        question: "2 + 2 = ?",
        options: [3, 4, 5],
        correctAnswer: 4
      },
      {
        id: 4,
        question: "1 + 3 = ?",
        options: [3, 4, 5],
        correctAnswer: 4
      },
      {
        id: 5,
        question: "2 + 3 = ?",
        options: [4, 5, 6],
        correctAnswer: 5
      }
    ]
  },
  {
    id: 2,
    name: "Les additions avec des nombres plus grands",
    description: "Additionne des nombres de 6 à 10.",
    introduction: "Bravo ! Maintenant, tu vas additionner des nombres un peu plus grands. Souviens-toi, quand on additionne, on compte tous les éléments ensemble.",
    questions: [
      {
        id: 1,
        question: "6 + 2 = ?",
        options: [7, 8, 9],
        correctAnswer: 8
      },
      {
        id: 2,
        question: "8 + 3 = ?",
        options: [10, 11, 12],
        correctAnswer: 11
      },
      {
        id: 3,
        question: "7 + 4 = ?",
        options: [10, 11, 12],
        correctAnswer: 11
      },
      {
        id: 4,
        question: "9 + 1 = ?",
        options: [9, 10, 11],
        correctAnswer: 10
      },
      {
        id: 5,
        question: "5 + 5 = ?",
        options: [9, 10, 11],
        correctAnswer: 10
      }
    ]
  },
  {
    id: 3,
    name: "Les additions dans la vie réelle",
    description: "Résous des problèmes d'addition dans des situations de la vie quotidienne.",
    introduction: "Super ! Dans ce dernier niveau, tu vas utiliser l'addition pour résoudre des problèmes de la vie de tous les jours. Lis bien chaque question.",
    questions: [
      {
        id: 1,
        question: "Combien de pommes y a-t-il en tout ?",
        context: "Il y a 12 pommes dans un panier, et 5 autres sont ajoutées.",
        options: [15, 17, 18],
        correctAnswer: 17
      },
      {
        id: 2,
        question: "Combien de jouets a le chaton maintenant ?",
        context: "Un chaton a 8 jouets, et en trouve 7 autres.",
        options: [14, 15, 16],
        correctAnswer: 15
      },
      {
        id: 3,
        question: "Combien d'oiseaux y a-t-il sur la branche ?",
        context: "Il y a 6 oiseaux sur une branche. 9 autres oiseaux les rejoignent.",
        options: [14, 15, 16],
        correctAnswer: 15
      },
      {
        id: 4,
        question: "Combien de fleurs y a-t-il dans le jardin ?",
        context: "Il y a 10 fleurs dans un jardin. 8 nouvelles fleurs ont poussé.",
        options: [17, 18, 19],
        correctAnswer: 18
      },
      {
        id: 5,
        question: "Combien d'enfants y a-t-il en tout ?",
        context: "Il y a 14 enfants qui jouent au parc. 6 autres enfants arrivent.",
        options: [18, 20, 22],
        correctAnswer: 20
      }
    ]
  }
];

// Classement fictif pour les démos
export const initialLeaderboard: ScoreRecord[] = [
  {
    id: "1",
    username: "Sophie",
    avatar: "👧",
    score: 5500,
    level: 3,
    date: new Date().toISOString()
  },
  {
    id: "2",
    username: "Lucas",
    avatar: "👦",
    score: 5000,
    level: 3,
    date: new Date().toISOString()
  },
  {
    id: "3",
    username: "Emma",
    avatar: "👧",
    score: 4500,
    level: 2,
    date: new Date().toISOString()
  },
  {
    id: "4",
    username: "Thomas",
    avatar: "👦",
    score: 4000,
    level: 2,
    date: new Date().toISOString()
  },
  {
    id: "5",
    username: "Jade",
    avatar: "👧",
    score: 3500,
    level: 1,
    date: new Date().toISOString()
  }
];

// Sons du jeu
export const gameSounds = {
  correct: new Audio("/sounds/correct.mp3"),
  incorrect: new Audio("/sounds/incorrect.mp3"),
  levelComplete: new Audio("/sounds/level-complete.mp3"),
  gameComplete: new Audio("/sounds/game-complete.mp3"),
  catMeow: new Audio("/sounds/cat-meow.mp3")
};

// Utilitaire pour mélanger les options
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Fonction pour générer un ID unique
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Gestion locale du stockage des scores
export function saveScore(score: ScoreRecord): void {
  try {
    const scores = getScores();
    scores.push(score);
    localStorage.setItem("catRescueScores", JSON.stringify(scores));
  } catch (error) {
    console.error("Error saving score:", error);
  }
}

export function getScores(): ScoreRecord[] {
  try {
    const scoresJson = localStorage.getItem("catRescueScores");
    return scoresJson ? JSON.parse(scoresJson) : [...initialLeaderboard];
  } catch (error) {
    console.error("Error getting scores:", error);
    return [...initialLeaderboard];
  }
}

export function getTopScores(limit: number = 5): ScoreRecord[] {
  return getScores()
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Sauvegarder le profil utilisateur
export function saveUserProfile(name: string, avatar: string = "😺"): string {
  const userId = generateId();
  const profile = {
    id: userId,
    name,
    avatar,
    totalScore: 0,
    levelScores: {}
  };
  try {
    localStorage.setItem(`catRescueProfile_${userId}`, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
  return userId;
}

// Mettre à jour le score du profil
export function updateUserScore(userId: string, level: number, score: number): void {
  try {
    const profileJson = localStorage.getItem(`catRescueProfile_${userId}`);
    if (profileJson) {
      const profile = JSON.parse(profileJson);
      profile.levelScores[level] = Math.max(profile.levelScores[level] || 0, score);
      profile.totalScore = Object.values(profile.levelScores).reduce((sum: number, score: any) => sum + score, 0);
      localStorage.setItem(`catRescueProfile_${userId}`, JSON.stringify(profile));
    }
  } catch (error) {
    console.error("Error updating user score:", error);
  }
}
