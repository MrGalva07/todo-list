import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiPlus, FiTrash2, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { todoService } from '../services/api';
import { Todo, CreateTodoDto } from '../types/Todo';
import { theme } from '../styles/theme';
import { cardStyle, inputStyle, neonButton, flexCenter, truncateText } from '../styles/mixins';

// ========== ANIMAÇÕES ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }  // ← ACENTO REMOVIDO!
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

// ========== TIPOS ==========
type FilterType = 'all' | 'active' | 'completed';

// ========== ESTILOS ==========
const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: ${theme.spacing.lg};
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    min-height: 100vh;
    color: ${theme.colors.text};
`;

const Header = styled.div`
    margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
    font-size: ${theme.typography.sizes.xxxl};
    font-weight: ${theme.typography.weights.bold};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.xs};
    letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.sizes.sm};
    margin-bottom: ${theme.spacing.lg};
`;

const InputSection = styled.div`
    ${cardStyle}
    margin-bottom: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
    ${inputStyle}
    border-bottom-color: ${props => props.$hasError ? theme.colors.danger : theme.colors.border};
    margin-bottom: ${theme.spacing.md};

    &:focus {
        border-bottom-color: ${props => props.$hasError ? theme.colors.danger : theme.colors.neonOrange};
    }
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
    ${inputStyle}
    border-bottom-color: ${props => props.$hasError ? theme.colors.danger : theme.colors.border};
    min-height: 60px;
    resize: vertical;
    margin-bottom: ${theme.spacing.md};

    &:focus {
        border-bottom-color: ${props => props.$hasError ? theme.colors.danger : theme.colors.neonOrange};
    }
`;

const ErrorText = styled.span`
    color: ${theme.colors.danger};
    font-size: ${theme.typography.sizes.xs};
    margin-top: -${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    display: block;
`;

const AddButton = styled.button`
    ${neonButton}
    font-size: ${theme.typography.sizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FilterSection = styled.div`
    ${flexCenter}
    justify-content: space-between;
    margin-bottom: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.xs};
`;

const FilterLabel = styled.span`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.sizes.sm};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
`;

const FilterButtons = styled.div`
    display: flex;
    gap: ${theme.spacing.sm};
`;

const FilterButton = styled.button<{ $active: boolean }>`
    background: ${props => props.$active ? theme.colors.neonOrange : 'transparent'};
    border: 1px solid ${props => props.$active ? theme.colors.neonOrange : theme.colors.border};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: ${theme.typography.sizes.sm};
    color: ${props => props.$active ? 'white' : theme.colors.textSecondary};
    cursor: pointer;
    border-radius: 20px;
    transition: ${theme.transitions.default};
    font-weight: ${props => props.$active ? theme.typography.weights.semibold : theme.typography.weights.regular};

    &:hover {
        border-color: ${theme.colors.neonOrange};
        color: ${props => props.$active ? 'white' : theme.colors.neonOrange};
        background: ${props => props.$active ? theme.colors.neonOrangeHover : 'transparent'};
    }
`;

const TodoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
`;

const TodoItem = styled.div<{ $isCompleted: boolean }>`
    ${cardStyle}
    display: flex;
    align-items: flex-start;
    gap: ${theme.spacing.md};
    opacity: ${props => props.$isCompleted ? 0.8 : 1};
    animation: ${fadeIn} 0.3s ease;

    &:hover {
        transform: translateX(4px);
    }
`;

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    margin-top: 2px;
    cursor: pointer;
    accent-color: ${theme.colors.neonOrange};
    transition: ${theme.transitions.fast};

    &:hover {
        transform: scale(1.1);
    }
`;

const TodoContent = styled.div`
    flex: 1;
`;

const TodoTitle = styled.h3<{ $isCompleted: boolean }>`
    margin: 0 0 ${theme.spacing.xs} 0;
    font-size: ${theme.typography.sizes.lg};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.text};
    text-decoration: ${props => props.$isCompleted ? 'line-through' : 'none'};
    opacity: ${props => props.$isCompleted ? 0.6 : 1};
    ${truncateText}
`;

const TodoDescription = styled.p`
    margin: 0;
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${theme.colors.danger};
    cursor: pointer;
    padding: ${theme.spacing.xs};
    border-radius: ${theme.borderRadius.sm};
    transition: ${theme.transitions.default};
    opacity: 0.7;

    &:hover {
        opacity: 1;
        background: rgba(255, 77, 79, 0.1);
        transform: scale(1.1);
    }
`;

const LoadingState = styled.div`
    ${flexCenter}
    flex-direction: column;
    padding: ${theme.spacing.xxl} ${theme.spacing.lg};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.sizes.md};
    text-align: center;
    gap: ${theme.spacing.md};
`;

const LoadingSpinner = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid ${theme.colors.border};
    border-top-color: ${theme.colors.neonOrange};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

const LoadingText = styled.p`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.sizes.sm};
    animation: ${pulse} 1.5s ease-in-out infinite;
`;

const EmptyState = styled.div`
    ${flexCenter}
    ${cardStyle}
    flex-direction: column;
    padding: ${theme.spacing.xxl} ${theme.spacing.lg};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.sizes.md};
    border: 1px dashed ${theme.colors.border};
    text-align: center;
`;

const NumbersIndicator = styled.div`
    display: flex;
    gap: ${theme.spacing.xl};
    margin-top: ${theme.spacing.xl};
    padding-top: ${theme.spacing.lg};
    border-top: 1px solid ${theme.colors.border};
`;

const NumberItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.sizes.sm};

    span {
        font-weight: ${theme.typography.weights.bold};
        color: ${theme.colors.neonOrange};
        font-size: ${theme.typography.sizes.lg};
    }
`;

const ButtonGroup = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.xs};
`;

const RetryButton = styled.button`
    background: transparent;
    border: 1px solid ${theme.colors.neonOrange};
    color: ${theme.colors.neonOrange};
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.sizes.sm};
    cursor: pointer;
    transition: ${theme.transitions.default};
    margin-top: ${theme.spacing.md};

    &:hover {
        background: ${theme.colors.neonOrange};
        color: white;
    }
`;

// ========== COMPONENTE PRINCIPAL ==========
const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('all');
    const [formData, setFormData] = useState<CreateTodoDto>({
        title: '',
        description: ''
    });
    const [titleError, setTitleError] = useState<string>('');

    const loadTodos = async (showToast = false) => {
        setLoading(true);
        setLoadError(null);
        
        try {
            const data = await todoService.getAll();
            setTodos(data);
            if (showToast) {
                toast.success('Tarefas carregadas!');
            }
        } catch (error) {
            setLoadError('Não foi possível conectar ao servidor. O serviço pode estar inicializando...');
         
            if (!initialLoading) {
                toast.error('Erro ao carregar tarefas. Tentando novamente...');
            }
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    useEffect(() => {
     
        const timeoutId = setTimeout(() => {
            if (initialLoading) {
                loadTodos();
            }
        }, 1000); 

        return () => clearTimeout(timeoutId);
  
    }, []);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.isCompleted;
        if (filter === 'completed') return todo.isCompleted;
        return true;
    });

    const totalTasks = todos.length;
    const completedTasks = todos.filter(t => t.isCompleted).length;
    const activeTasks = totalTasks - completedTasks;

    const validateForm = (): boolean => {
        if (formData.title.trim().length < 3) {
            setTitleError('Título deve ter pelo menos 3 caracteres');
            return false;
        }
        if (formData.title.trim().length > 100) {
            setTitleError('Título deve ter no máximo 100 caracteres');
            return false;
        }
        setTitleError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Por favor, corrija os erros');
            return;
        }
        
        setLoading(true);

        try {
            await todoService.create(formData);
            setFormData({ title: '', description: '' });
            await loadTodos();
            toast.success('Tarefa criada!');
        } catch {
            toast.error('Erro ao salvar tarefa');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (todo: Todo) => {
        try {
            await todoService.update(todo.id, {
                title: todo.title,
                description: todo.description,
                isCompleted: !todo.isCompleted
            });
            await loadTodos();
            toast.success(todo.isCompleted ? 'Tarefa reaberta!' : 'Tarefa concluída!');
        } catch {
            toast.error('Erro ao atualizar');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Deletar esta tarefa?')) return;

        try {
            await todoService.delete(id);
            await loadTodos();
            toast.success('Tarefa deletada!');
        } catch {
            toast.error('Erro ao deletar');
        }
    };

    const handleRetry = () => {
        loadTodos(true);
    };

    // Loading inicial 
    if (initialLoading) {
        return (
            <Container>
                <Header>
                    <Title>Minhas Tarefas</Title>
                </Header>
                <LoadingState>
                    <LoadingSpinner />
                    <LoadingText>Iniciando aplicação...</LoadingText>
                    <LoadingText style={{ fontSize: '0.8rem' }}>
                        O servidor pode levar alguns segundos para iniciar
                    </LoadingText>
                </LoadingState>
            </Container>
        );
    }

    // Erro no carregamento - opção de tentar novamente
    if (loadError) {
        return (
            <Container>
                <Header>
                    <Title>Minhas Tarefas</Title>
                </Header>
                <EmptyState>
                    <p>{loadError}</p>
                    <RetryButton onClick={handleRetry}>
                        Tentar novamente
                    </RetryButton>
                </EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Title>Minhas Tarefas</Title>
                <Subtitle>{activeTasks} tarefas pendentes</Subtitle>
            </Header>

            <InputSection>
                <form onSubmit={handleSubmit}>
                    <StyledInput
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                            if (titleError) setTitleError('');
                        }}
                        placeholder="O que precisa ser feito?"
                        disabled={loading}
                        $hasError={!!titleError}
                    />
                    {titleError && <ErrorText>{titleError}</ErrorText>}
                    
                    <StyledTextArea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descrição (opcional)"
                        disabled={loading}
                    />
                    
                    <ButtonGroup>
                        <AddButton type="submit" disabled={loading}>
                            <FiPlus /> Adicionar
                        </AddButton>
                    </ButtonGroup>
                </form>
            </InputSection>

            <FilterSection>
                <FilterLabel>
                    <FiFilter size={16} color={theme.colors.neonOrange} /> Filtrar:
                </FilterLabel>
                <FilterButtons>
                    <FilterButton 
                        $active={filter === 'all'} 
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </FilterButton>
                    <FilterButton 
                        $active={filter === 'active'} 
                        onClick={() => setFilter('active')}
                    >
                        Ativas
                    </FilterButton>
                    <FilterButton 
                        $active={filter === 'completed'} 
                        onClick={() => setFilter('completed')}
                    >
                        Concluídas
                    </FilterButton>
                </FilterButtons>
            </FilterSection>

            <TodoListContainer>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} $isCompleted={todo.isCompleted}>
                        <Checkbox
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => handleToggleComplete(todo)}
                        />
                        <TodoContent>
                            <TodoTitle $isCompleted={todo.isCompleted}>
                                {todo.title}
                            </TodoTitle>
                            {todo.description && (
                                <TodoDescription>{todo.description}</TodoDescription>
                            )}
                        </TodoContent>
                        <DeleteButton onClick={() => handleDelete(todo.id)}>
                            <FiTrash2 size={18} />
                        </DeleteButton>
                    </TodoItem>
                ))}
            </TodoListContainer>

            {filteredTodos.length === 0 && !loading && (
                <EmptyState>
                     Nenhuma tarefa {
                        filter === 'all' ? '' : 
                        filter === 'active' ? 'ativa' : 
                        filter === 'completed' ? 'concluída' : ''
                    }
                </EmptyState>
            )}

            <NumbersIndicator>
                <NumberItem>
                    <span>{totalTasks}</span> total
                </NumberItem>
                <NumberItem>
                    <span>{activeTasks}</span> ativas
                </NumberItem>
                <NumberItem>
                    <span>{completedTasks}</span> concluídas
                </NumberItem>
            </NumbersIndicator>
        </Container>
    );
};

export default TodoList;