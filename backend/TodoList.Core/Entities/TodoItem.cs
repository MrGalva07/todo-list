namespace TodoList.Core.Entities;


public class TodoItem
{
  
    public TodoItem(string title, string description)
    {
        Id = Guid.NewGuid();  
        Title = title;
        Description = description;
        IsCompleted = false;  // Começa como não concluída
        CreatedAt = DateTime.UtcNow;  // Marca o momento da criação
    }


    public Guid Id { get; private set; }  
    public string Title { get; private set; }
    public string Description { get; private set; }
    public bool IsCompleted { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? CompletedAt { get; private set; } 


    public void Complete()
    {
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
    }

    public void Update(string title, string description)
    {
        Title = title;
        Description = description;
    }
}