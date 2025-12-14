export type DiplomasInfo = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};
export type DiplomasResponse = {
  subjects: DiplomasInfo[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
};
