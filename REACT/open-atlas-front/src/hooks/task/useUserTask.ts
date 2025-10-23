import { useState, useEffect } from 'react';
import type { TaskFromAPI } from '@src/types/task/Task.type';
import type { UserType } from '@src/types/user/User.type';
import { taskService } from '@src/services/tableApi/table.api';
import { userService } from '@src/services/userApi/user.api';
import type { userTasksReturnType } from '@src/types/task/Task.type';


export const useUserTasks = (initialUserId: number = 1): userTasksReturnType => {
  const [userId, setUserId] = useState<number>(initialUserId);
  const [tasks, setTasks] = useState<TaskFromAPI[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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
    } catch (err) {
      setError('Error al cargar los datos del usuario');
      console.error('Error fetching user data:', err);
      setUser(null);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const refetch = () => {
    fetchData();
  };

  return {
    tasks,
    user,
    loading,
    error,
    userId,
    setUserId,
    refetch
  };
};