using ASP.NetCore_React_WebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP.NetCore_React_WebApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        
        public DbSet<ToDo> Todos { get; set; }
    }
}