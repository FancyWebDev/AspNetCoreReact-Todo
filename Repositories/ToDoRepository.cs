using System;
using System.Collections.Generic;
using System.Linq;
using ASP.NetCore_React_WebApp.Data;
using ASP.NetCore_React_WebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP.NetCore_React_WebApp.Repositories
{
    public interface IToDoRepository : IRepository<ToDo> { }

    public class ToDoRepository : IToDoRepository
    {
        private readonly DataContext _dataContext;

        public ToDoRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<ToDo> GetAll() => _dataContext.Todos;

        public ToDo Get(Func<ToDo, bool> predicate, bool noTracking = false) => 
            _dataContext.Todos.Where(predicate).FirstOrDefault() ?? throw new IndexOutOfRangeException();

        public void Create(ToDo todo)
        {
            _dataContext.Add(todo);
            Save();
        }

        public void Update(ToDo todo)
        {
            _dataContext.Update(todo);
            Save();
        }

        public void Delete(ToDo todo)
        {
            _dataContext.Remove(todo);
            Save();
        }

        public bool Exist(Func<ToDo, bool> predicate) => _dataContext.Todos.AsNoTracking().Any(predicate);

        public void Save() => _dataContext.SaveChanges();
    }
}