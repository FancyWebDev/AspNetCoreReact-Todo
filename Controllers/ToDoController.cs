using System.Collections.Generic;
using ASP.NetCore_React_WebApp.Dto;
using ASP.NetCore_React_WebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NetCore_React_WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _todoService;

        public ToDoController(IToDoService todoService)
        {
            _todoService = todoService;
        }
        
        [HttpGet]
        public IEnumerable<ToDoDto> Get() => _todoService.GetAll();

        [HttpGet("{id:int}")]
        public ToDoDto Get([FromRoute] int id) => _todoService.Get(todo => todo.Id == id);

        [HttpPost]
        public IActionResult Create([FromBody] ToDoDto todoDto)
        {
            if (todoDto == null || ModelState.IsValid == false)
                return BadRequest();
            
            _todoService.Add(todoDto);
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] ToDoDto todoDto)
        {
            if (todoDto == null || ModelState.IsValid == false || todoDto.Id != id)
                return BadRequest();

            if (_todoService.Exist(todo => todo.Id == id) == false)
                return NotFound();
            
            _todoService.Update(todoDto);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete([FromRoute] int id, [FromBody] ToDoDto todoDto)
        {
            if (todoDto == null || ModelState.IsValid == false || todoDto.Id != id)
                return BadRequest();
            
            if (_todoService.Exist(todo => todo.Id == id) == false)
                return NotFound();
            
            _todoService.Delete(todoDto);
            return NoContent();
        }
    }
}