using System.Collections.Generic;
using System.Linq;
using ASP.NetCore_React_WebApp.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ASP.NetCore_React_WebApp.Data
{
    public class Seed
    {
        public static void SeedData(IApplicationBuilder applicationBuilder)
        {
            using var serviceScope = applicationBuilder.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetService<DataContext>();

            context?.Database.EnsureCreated();

            if (context == null || context.Todos.Any())
                return;

            var todos = new List<ToDo>
            {
                new()
                {
                    Title = "Go to Shop",
                    Description = "Go to Mall and buy some products",
                    Priority = ToDoPriority.Medium,
                    Status = ToDoStatus.ToDo
                },
                new()
                {
                    Title = "Watch Film",
                    Description = "Watch the film - 'The Truman Show'",
                    Priority = ToDoPriority.Low,
                    Status = ToDoStatus.InProgress
                },
                new()
                {
                    Title = "Meeting with friends",
                    Description = "In the evening at 6 o'clock meeting with friends at the new park",
                    Priority = ToDoPriority.High,
                    Status = ToDoStatus.ToDo
                },
                new()
                {
                    Title = "Cook dinner",
                    Description = "Cook a casserole and make a light salad with cucumbers and tomatoes",
                    Priority = ToDoPriority.Medium,
                    Status = ToDoStatus.Done
                }
            };
            
            context.Todos.AddRange(todos);
            context.SaveChanges();
        }
    }
}