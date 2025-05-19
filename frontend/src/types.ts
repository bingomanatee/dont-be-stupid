export type Category = {
  name: string;
  id: string;
  imageUrl?: string;
  photographer?: string;
};

export type Question = {
  question: string;
  id: string;
  questions: string[];
  correctAnswer: number;
  cat: string;
  stupidAnswers: number[];
};
