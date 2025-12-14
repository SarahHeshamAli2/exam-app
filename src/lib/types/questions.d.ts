type Answer = {
  answer: string;
  key: string;
};

type QuestionBase = {
  QID: string;
  Question: string;
  correctAnswer: string;
};

type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  correct: string;
  exam: {
    title: string;
    duration: number;
  };
};

export type SubmittedAnswer = {
  questionId: string;
  correct: string;
};

export type SubmittedAnswers = {
  answers: SubmittedAnswer[];
  time: number;
};

type CorrectQuestion = QuestionBase;

type WrongQuestion = QuestionBase & {
  inCorrectAnswer: string;
};

export type ExamResults = {
  correctQuestions: CorrectQuestion[];
  WrongQuestions: WrongQuestion[];
  correct: number;
  wrong: number;
  total: string;
};

export type ExamQuestionsProps = {
  questions: Question[];
  examTitle?: string;
};

export type CheckedAnswersProps = {
  results: ExamResults | null;
  onRestart: () => void;
};

export type GetQuestionsOnExamResponse = {
  questions: Question[];
};

export type ExamResultsResponse = ExamResults;
