export interface Todo {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    completedAt?: string;
}

export interface CreateTodoDto {
    title: string;
    description: string;
}

export interface UpdateTodoDto {
    title: string;
    description: string;
    isCompleted: boolean;
}