using Microsoft.EntityFrameworkCore;
using TodoList.Core.Interfaces;
using TodoList.Infrastructure.Data;
using TodoList.Infrastructure.Repositories;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi(); 

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",  
                "http://localhost:3001",  
                "http://localhost:3002",  
                "http://localhost:3003",
                "https://todo-list07.vercel.app" 
            )
            .AllowAnyHeader()              
            .AllowAnyMethod()              
            .AllowCredentials();          
        });
});


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<ITodoRepository, TodoRepository>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();                               
    app.MapScalarApiReference(options =>            
    {
        options.WithTitle("Todo List API")
               .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}

app.UseHttpsRedirection();  
app.UseCors("AllowReactApp"); 
app.UseAuthorization();
app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    if (app.Environment.IsProduction())
    {
        dbContext.Database.Migrate(); // Aplica migrations no Render
        Console.WriteLine("✅ Migrations applied successfully");
    }
    else
    {
        dbContext.Database.EnsureCreated(); // cria banco se não existir
        Console.WriteLine("✅ Database ensured created (development)");
    }
}

app.Run();