import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/Todo';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});


api.interceptors.response.use(
    response => response,
    error => {
     
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const todoService = {
    getAll: async (): Promise<Todo[]> => {
        const response = await api.get<Todo[]>('/todo');
        return response.data;
    },

    create: async (data: CreateTodoDto): Promise<Todo> => {
        const response = await api.post<Todo>('/todo', data);
        return response.data;
    },

    update: async (id: string, data: UpdateTodoDto): Promise<void> => {
        await api.put(`/todo/${id}`, data);
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/todo/${id}`);
    },
};

export default api;