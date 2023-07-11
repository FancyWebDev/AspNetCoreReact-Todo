using System;
using System.Collections.Generic;
using System.Linq;
using ASP.NetCore_React_WebApp.Dto;
using ASP.NetCore_React_WebApp.Models;
using ASP.NetCore_React_WebApp.Repositories;

namespace ASP.NetCore_React_WebApp.Services
{
    public interface IToDoService
    {
        IEnumerable<ToDoDto> GetAll();
        ToDoDto Get(Func<ToDo, bool> predicate);
        bool Exist(Func<ToDo, bool> predicate);
        void Add(ToDoDto todoDto);
        void Update(ToDoDto todoDto);
        void Delete(ToDoDto todoDto);
    }

    public class ToDoService : IToDoService
    {
        private readonly IToDoRepository _todoRepository;

        public ToDoService(IToDoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }
        
        public IEnumerable<ToDoDto> GetAll()
        {
            return _todoRepository.GetAll().Select(todo => new ToDoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Priority = todo.Priority,
                Status = todo.Status
            });
        }

        public ToDoDto Get(Func<ToDo, bool> predicate)
        {
            var todo = _todoRepository.Get(predicate);

            return new ToDoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Priority = todo.Priority,
                Status = todo.Status
            };
        }

        public bool Exist(Func<ToDo, bool> predicate) => _todoRepository.Exist(predicate);

        public void Add(ToDoDto todoDto)
        {
            var todo = new ToDo
            {
                Title = todoDto.Title,
                Description = todoDto.Description,
                Priority = todoDto.Priority,
                Status = todoDto.Status
            };
            
            _todoRepository.Create(todo);
        }

        public void Update(ToDoDto todoDto)
        {
            var updatedTodo = new ToDo
            {
                Id = todoDto.Id,
                Title = todoDto.Title,
                Description = todoDto.Description,
                Priority = todoDto.Priority,
                Status = todoDto.Status
            };
            
            _todoRepository.Update(updatedTodo);
        }

        public void Delete(ToDoDto todoDto)
        {
            var todo = _todoRepository.Get(todo => todo.Id == todoDto.Id);
            _todoRepository.Delete(todo);
        }
    }
}