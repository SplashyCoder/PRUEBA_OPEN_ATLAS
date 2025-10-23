import { TaskTable } from '@src/components/table/TaskTable';
import { UserHeader } from '@src/components/table/UserHeader';
import { UserInput } from '@src/components/table/UserInput';
import { useUserTasks } from '@src/hooks/task/useUserTask';

export const DashboardPage: React.FC = () => {
  const {
    tasks,
    user,
    loading,
    error,
    userId,
    setUserId,
    searchUser
  } = useUserTasks(1);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <div className="text-xl font-semibold mb-2">Error</div>
            <div>{error}</div>
          </div>
          <button
            onClick={searchUser}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <UserHeader 
            user={user} 
            tasksCount={tasks.length} 
            loading={loading} 
          />
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <UserInput 
              userId={userId} 
              onUserIdChange={setUserId}
              onSearch={searchUser}
              loading={loading}
            />
            <div className="text-sm text-gray-500">
              Total: {tasks.length} tarea{tasks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <TaskTable tasks={tasks} loading={loading} />
      </div>
    </div>
  );
};