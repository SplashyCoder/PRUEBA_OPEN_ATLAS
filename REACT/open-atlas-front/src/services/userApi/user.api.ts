import { api } from '../tableApi/table.api';
import type { UserType } from '@src/types/user/User.type';

export const userService = {
  getUser: async (userId: number): Promise<UserType> => {
    const response = await api.get(`/user/${userId}`);
    return response.data; // ✅ La estructura ya coincide
  },
};