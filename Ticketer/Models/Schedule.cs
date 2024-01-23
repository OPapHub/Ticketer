namespace Ticketer.Models
{
    public class Schedule
    {
        public int Id { get; set; }        
        public Movie Movie { get; set; } = new();        
        public Auditorium Auditorium { get; set; } = new();
        public DateTime Time { get; set; }

        public List<Ticket> Tickets { get; set; } = new();
        public List<Reserved_Seat> Reserved_Seats { get; set; } = new();
    }
}
