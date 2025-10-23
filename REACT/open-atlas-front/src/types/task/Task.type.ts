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
    // Agrega description si viene en la API
    task_description?: string;
}

export type TasksResponse = {
    user_id: number;
    tasks_count: number;
    tasks: TaskFromAPI[];
}

// Si necesitas mantener el tipo anterior para otras partes, puedes crear:
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