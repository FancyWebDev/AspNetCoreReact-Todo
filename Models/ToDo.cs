using ASP.NetCore_React_WebApp.Data;

namespace ASP.NetCore_React_WebApp.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ToDoStatus Status { get; set; }
        public ToDoPriority Priority { get; set; }
    }
}