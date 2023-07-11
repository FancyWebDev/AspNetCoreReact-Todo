using System;

namespace ASP.NetCore_React_WebApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public int Age { get; set; }
        public DateOnly CreatedAt { get; set; } 
    }
}