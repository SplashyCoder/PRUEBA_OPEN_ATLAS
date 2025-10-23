export type TaskType = {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string;
    updatedAt?: string;
    userId: number;
    prjectId?: number;
}

export type TaskwithDetailsType = TaskType & {
    project: {
        id: number;
        name: string;
        description?: string;
    }
    rate?:{
        amount: number;
        currency: string;
    }
} 