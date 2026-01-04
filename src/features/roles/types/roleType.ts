export interface Role {
  active: boolean;
  createdAt: string;
  deletedAt: string;
  id: number;
  maxRequestPerMinute: number;
  name: string;
  order: string;
  parentId: string;
  updatedAt: string;
  workingDayLimit: number[];
  workingTimeLimit: string;
}
