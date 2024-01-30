namespace Ticketer.Models
{
    public class Auditorium
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Seats_Number { get; set; }
        public Movie_Theatre Movie_Theatre { get; set; } = new();

        public List<Seat> Seats { get; set; } = new();
        public List<Schedule> Schedules { get; set; } = new(); 
    }
}
