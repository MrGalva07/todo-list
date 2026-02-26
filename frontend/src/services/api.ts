import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/Todo';


const API_URL = 'http://localhost:5000/api';

console.log(' Conectando à API:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

// Interceptor para log detalhado
api.interceptors.request.use(config => {
    console.log(' Requisição:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data
    });
    return config;
});

api.interceptors.response.use(
    response => {
        console.log(' Resposta:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error(' Erro detalhado:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
            config: {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                method: error.config?.method
            }
        });
        return Promise.reject(error);
    }
);

export const todoService = {
    // Buscar todas as tarefas
    getAll: async (): Promise<Todo[]> => {
        try {
            console.log(' Buscando tarefas...');
            const response = await api.get<Todo[]>('/todo');
            console.log(' Tarefas carregadas:', response.data);
            return response.data;
        } catch (error) {
            console.error(' Erro no getAll:', error);
            throw error;
        }
    },

    // Criar nova tarefa
    create: async (data: CreateTodoDto): Promise<Todo> => {
        try {
            console.log(' Criando tarefa:', data);
            const response = await api.post<Todo>('/todo', data);
            console.log(' Tarefa criada:', response.data);
            return response.data;
        } catch (error) {
            console.error(' Erro no create:', error);
            throw error;
        }
    },

    // Atualizar tarefa
    update: async (id: string, data: UpdateTodoDto): Promise<void> => {
        try {
            console.log(' Atualizando tarefa:', id, data);
            await api.put(`/todo/${id}`, data);
            console.log(' Tarefa atualizada');
        } catch (error) {
            console.error(' Erro no update:', error);
            throw error;
        }
    },

    // Deletar tarefa
    delete: async (id: string): Promise<void> => {
        try {
            console.log(' Deletando tarefa:', id);
            await api.delete(`/todo/${id}`);
            console.log(' Tarefa deletada');
        } catch (error) {
            console.error('Erro no delete:', error);
            throw error;
        }
    },
};

// Teste rápido de conexão
export const testConnection = async (): Promise<boolean> => {
    try {
        console.log(' Testando conexão com backend...');
        const response = await api.get('/todo');
        console.log(' Conexão OK!', response.data);
        return true;
    } catch (error) {
        console.error('Falha na conexão:', error);
        return false;
    }
};

export default api;