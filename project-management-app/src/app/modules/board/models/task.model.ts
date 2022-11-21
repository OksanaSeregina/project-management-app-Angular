export interface TaskResp {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export interface TaskSetReq {
  _id: string;
  order: number;
  columnId: string;
}
