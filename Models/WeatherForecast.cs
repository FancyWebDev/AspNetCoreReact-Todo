using System;

namespace ASP.NetCore_React_WebApp.Models
{
    public class WeatherForecast
    {
        public string? Summary { get; set; }
        
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int) (TemperatureC / 0.5556);
    }
}