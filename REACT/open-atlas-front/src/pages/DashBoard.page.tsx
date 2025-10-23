import { useState, useEffect } from 'react';
import { TaskTable } from '@src/components/table/TaskTable';
import { taskService } from '@src/services/tableApi/table.api';
import type { TaskFromAPI } from '@src/types/task/Task.type';

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getUserTasks(1);
        setTasks(response.tasks);
      } catch (err) {
        setError('Error al cargar las tareas');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-red-500 text-center">
            <div className="text-xl font-semibold mb-2">Error</div>
            <div>{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Tareas</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y visualiza todas tus tareas y proyectos
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Tareas del Usuario</h2>
          <div className="text-sm text-gray-500">
            Total: {tasks?.length} tareas
          </div>
        </div>

        <TaskTable tasks={tasks} loading={loading} />
      </div>
    </div>
  );
};