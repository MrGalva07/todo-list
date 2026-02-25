namespace TodoList.Core.DTOs;


// Para CRIAR uma nova tarefa (o cliente envia isso)
public class CreateTodoDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

// Para ATUALIZAR uma tarefa existente
public class UpdateTodoDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

// Para RESPONDER com os dados da tarefa 
public class TodoResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}