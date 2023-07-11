using System;
using System.Collections.Generic;
using ASP.NetCore_React_WebApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NetCore_React_WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static int _newId;
        private static readonly User[] _users =
        {
            new()
            {
                Id = _newId++,
                UserName = "Alex",
                CreatedAt = DateOnly.FromDateTime(DateTime.Now.AddDays(_newId)),
                Age = Random.Shared.Next(12, 60),
            },
            new()
            {
                Id = _newId++,
                UserName = "Sam",
                CreatedAt = DateOnly.FromDateTime(DateTime.Now.AddDays(_newId)),
                Age = Random.Shared.Next(12, 60),
            },
            new()
            {
                Id = _newId++,
                UserName = "Bruno",
                CreatedAt = DateOnly.FromDateTime(DateTime.Now.AddDays(_newId)),
                Age = Random.Shared.Next(12, 60),
            }
        };

        [HttpGet]
        public IEnumerable<User> Get() => _users;
        
        [HttpGet("{id:int}")]
        public User Get([FromRoute] int id) => _users[id];
    }
}