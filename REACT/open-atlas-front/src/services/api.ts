import axios from 'axios';
import type { TasksResponse } from '@src/types/task/Task.type';

export const api = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskService = {
  getUserTasks: async (userId: number): Promise<TasksResponse> => {
    const response = await api.get(`/task/api/users/${userId}/tasks`);
    return response.data;
  },
};