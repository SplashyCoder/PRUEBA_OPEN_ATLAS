export type Task = {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string;
    updatedAt?: string;
    userId: number;
    prjectId?: number;
}

export type TaskwithDetails = Task & {
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