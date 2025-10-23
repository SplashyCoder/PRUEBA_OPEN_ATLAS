import axios from 'axios';
import type { TaskwithDetailsType } from '@src/types/task/Task.type';
const api_url = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: api_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskService = {
  getUserTasks: async (userId: number): Promise<{ tasks: TaskwithDetailsType[] }> => {
    const response = await api.get(`/task/api/users/${userId}/tasks`);
    return response.data;
  },
};