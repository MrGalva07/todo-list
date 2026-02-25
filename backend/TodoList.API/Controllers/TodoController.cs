using Microsoft.AspNetCore.Mvc;
using TodoList.Core.Entities;
using TodoList.Core.Interfaces;
using TodoList.Core.DTOs;

namespace TodoList.API.Controllers;

[ApiController] 
[Route("api/[controller]")] 
public class TodoController : ControllerBase
{
    private readonly ITodoRepository _repository;


    public TodoController(ITodoRepository repository)
    {
        _repository = repository;
    }

    // GET: api/todo
    [HttpGet]
    public async Task<ActionResult<List<TodoResponseDto>>> GetAll()
    {
        var todos = await _repository.GetAllAsync();
        
        // Converte as entidades para DTOs antes de enviar
        var response = todos.Select(t => new TodoResponseDto
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            IsCompleted = t.IsCompleted,
            CreatedAt = t.CreatedAt,
            CompletedAt = t.CompletedAt
        }).ToList();

        return Ok(response);  
    }

    // GET: api/todo/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoResponseDto>> GetById(Guid id)
    {
        var todo = await _repository.GetByIdAsync(id);
        
        if (todo == null)
            return NotFound();  

        var response = new TodoResponseDto
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = todo.IsCompleted,
            CreatedAt = todo.CreatedAt,
            CompletedAt = todo.CompletedAt
        };

        return Ok(response);
    }

    // POST: api/todo
    [HttpPost]
    public async Task<ActionResult<TodoResponseDto>> Create(CreateTodoDto dto)
    {
        // Cria uma nova entidade a partir do DTO recebido
        var todo = new TodoItem(dto.Title, dto.Description);
        
        await _repository.AddAsync(todo);

   
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, new TodoResponseDto
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = todo.IsCompleted,
            CreatedAt = todo.CreatedAt,
            CompletedAt = todo.CompletedAt
        });
    }

    // PUT: api/todo/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateTodoDto dto)
    {
        var todo = await _repository.GetByIdAsync(id);
        
        if (todo == null)
            return NotFound();

        // Atualiza os dados
        todo.Update(dto.Title, dto.Description);
        
        // Se marcou como concluída, chama o método Complete
        if (dto.IsCompleted && !todo.IsCompleted)
        {
            todo.Complete();
        }

        await _repository.UpdateAsync(todo);
        
        return NoContent();  
    }

    // DELETE: api/todo/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var todo = await _repository.GetByIdAsync(id);
        
        if (todo == null)
            return NotFound();

        await _repository.DeleteAsync(id);
        
        return NoContent();
    }
}