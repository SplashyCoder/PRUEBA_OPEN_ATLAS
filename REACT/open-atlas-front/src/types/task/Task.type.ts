import type { UserType } from '../user/User.type';

export type TaskFromAPI = {
    task_id: number;
    task_title: string;
    task_status: 'pending' | 'in_progress' | 'completed';
    project_id: number;
    project_name: string;
    hourly_rate?: {
        amount: string;
        currency: string;
    };
    task_description?: string;
}

export type TaskTableProps = {
  tasks?: TaskFromAPI[];
  loading?: boolean;
}

export type TasksResponse = {
    user_id: number;
    tasks_count: number;
    tasks: TaskFromAPI[];
}

export type TaskwithDetailsType = {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    project: {
        id: number;
        name: string;
        description?: string;
    };
    rate?: {
        amount: string;
        currency: string;
    };
}

export type userTasksReturnType = {
  tasks: TaskFromAPI[];
  user: UserType | null;
  loading: boolean;
  error: string | null;
  userId: number;
  setUserId: (id: number) => void;
  refetch: () => void;
}