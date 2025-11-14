using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

//Adicionar o serviço de banco de dados na aplicação
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Lucas Vargas de Brito Rocha");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, 
[FromBody] Tarefa tarefaAlterada,
[FromRoute] string id) =>
{
    Tarefa? resultado = ctx.Tarefas.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }
    if (tarefaAlterada.Status == "Não iniciada")
    {
        tarefaAlterada.Status = "Em andamento";
    }
    else if (tarefaAlterada.Status == "Em andamento")
    {
        tarefaAlterada.Status = "Concluída";
    }
    resultado.Status = tarefaAlterada.Status;
    ctx.Tarefas.Update(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
    //Implementar a alteração do status da tarefa
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx,
[FromBody] Tarefa tarefa) =>
{
        //Validar se existe alguma coisa dentro da lista    
    if (ctx.Tarefas.Any())
    {
        if (tarefa.Status != "Concluída")
        {
            return Results.Ok(ctx.Tarefas.ToList());
        }
    }
    return Results.BadRequest("Lista vazia");
    //Implementar a listagem de tarefas não concluídas
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx,
[FromBody] Tarefa tarefa) =>
{
            //Validar se existe alguma coisa dentro da lista    
    if (ctx.Tarefas.Any())
    {
        if (tarefa.Status == "Concluída")
        {
            return Results.Ok(ctx.Tarefas.ToList());
        }
    }
    return Results.BadRequest("Lista vazia");
    //Implementar a listagem de tarefas concluídas
});

app.Run();
