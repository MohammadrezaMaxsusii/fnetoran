export interface User {
  id: number;
  firstName: string;
  lastName: string;
  nationalId: string;
  gender: number;
  education: string;
  username: string;
  birthday: string;
  passwordHistoryCount: number;
  expirePasswordDays: string;
  mustChangePassword: boolean;
  passwordAdvantageDays: string;
  userRoleId: number;
  active: boolean;
  deactivedAt: string;
  email: string;
  cellphone: string;
  twoFAEnabled: boolean;
  profileId: string;
  userFileIds: string[];
  lastSessionDate: string;
  isSuperAdmin: boolean;
  changeLog: string;
  parentId: string;
  order: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  role: {
    id: number;
    name: string;
  };
}
