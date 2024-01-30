namespace Ticketer.Models
{
    public class Schedule
    {
        public int Id { get; set; }        
        public DateTime Time { get; set; }
        public int Movie_Theatre_Id { get; set; }
        public Movie Movie { get; set; } = new();
        public Auditorium Auditorium { get; set; } = new();
        public Movie_Theatre Movie_Theatre { get; set; } = new();
        public List<Ticket> Tickets { get; set; } = new();
        public List<Reserved_Seat> Reserved_Seats { get; set; } = new();
    }
}
