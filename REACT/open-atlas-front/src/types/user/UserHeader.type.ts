import type { UserType } from '../user/User.type';

export type UserHeaderType = {
  user: UserType | null;
  tasksCount: number;
  loading?: boolean;
}