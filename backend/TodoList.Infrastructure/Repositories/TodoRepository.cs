using Microsoft.EntityFrameworkCore;
using TodoList.Core.Entities;
using TodoList.Core.Interfaces;
using TodoList.Infrastructure.Data;

namespace TodoList.Infrastructure.Repositories;


public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;


    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    // Buscar todas as tarefas
    public async Task<List<TodoItem>> GetAllAsync()
    {
        return await _context.TodoItems.ToListAsync();
    }

    // Buscar uma tarefa por ID
    public async Task<TodoItem?> GetByIdAsync(Guid id)
    {
        return await _context.TodoItems.FindAsync(id);
    }

    // Adicionar nova tarefa
    public async Task AddAsync(TodoItem item)
    {
        await _context.TodoItems.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    // Atualizar tarefa existente
    public async Task UpdateAsync(TodoItem item)
    {
        _context.TodoItems.Update(item);
        await _context.SaveChangesAsync();
    }

    // Remover tarefa
    public async Task DeleteAsync(Guid id)
    {
        var item = await GetByIdAsync(id);
        if (item != null)
        {
            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}