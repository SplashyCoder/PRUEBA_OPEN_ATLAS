import { useState, useEffect } from 'react';
import type { TaskFromAPI } from '@src/types/task/Task.type';
import type { UserType } from '@src/types/user/User.type';
import { taskService } from '@src/services/tableApi/table.api';
import { userService } from '@src/services/userApi/user.api';

interface UseUserTasksReturn {
  tasks: TaskFromAPI[];
  user: UserType | null;
  loading: boolean;
  error: string | null;
  userId: number;
  setUserId: (id: number) => void;
  searchUser: () => Promise<void>;
}

export const useUserTasks = (initialUserId: number = 1): UseUserTasksReturn => {
  const [userId, setUserId] = useState<number>(initialUserId);
  const [tasks, setTasks] = useState<TaskFromAPI[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchUser = async () => {
    if (!userId || userId < 1) {
      setError('Por favor ingresa un ID válido');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch user data and tasks in parallel
      const [userResponse, tasksResponse] = await Promise.all([
        userService.getUser(userId),
        taskService.getUserTasks(userId)
      ]);

      setUser(userResponse);
      setTasks(tasksResponse.tasks);
    } catch (err: unknown) {
      type AxiosLikeError = { response?: { status?: number } };

      const status = (typeof err === 'object' && err !== null && 'response' in err)
        ? (err as AxiosLikeError).response?.status
        : undefined;

      const errorMessage = status === 404
        ? 'Usuario no encontrado'
        : 'Error al cargar los datos del usuario';
      
      setError(errorMessage);
      console.error('Error fetching user data:', err);
      setUser(null);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    user,
    loading,
    error,
    userId,
    setUserId,
    searchUser
  };
};