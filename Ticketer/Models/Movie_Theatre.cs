namespace Ticketer.Models
{
    public class Movie_Theatre
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public List<Auditorium> Auditoria { get; set; } = new();
        public List<Schedule> Schedules { get; set; } = new();
    }
}
