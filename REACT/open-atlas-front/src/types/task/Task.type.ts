export type TaskType = {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt: string;
    updatedAt?: string;
    userId: number;
    projectId?: number;
}

export type TaskwithDetailsType = TaskType & {
    project: {
        id: number;
        name: string;
        description?: string;
    }
    rate?:{
        amount: string;
        currency: string;
    }
} 