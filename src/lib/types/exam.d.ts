export type ExamType = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};
export type ExamInfo = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;

  createdAt: string;
};
export type ExamResponse = {
  exams: ExamInfo[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  message: string;
};

export type ExamTitleResponse = {
  exam: ExamInfo;
};
