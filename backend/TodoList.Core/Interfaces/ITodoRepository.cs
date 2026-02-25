using TodoList.Core.Entities;

namespace TodoList.Core.Interfaces;

public interface ITodoRepository
{
    Task<List<TodoItem>> GetAllAsync();          // Buscar todas as tarefas
    Task<TodoItem?> GetByIdAsync(Guid id);       // Buscar uma tarefa específica (pode retornar null)
    Task AddAsync(TodoItem item);                 // Adicionar nova tarefa
    Task UpdateAsync(TodoItem item);              // Atualizar tarefa existente
    Task DeleteAsync(Guid id);                    // Remover tarefa
}