namespace Ticketer.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int Number { get; set; }
        public Auditorium Auditorium { get; set; } = new();        

        public List<Reserved_Seat> Reserved_Seats { get; set; } = new();
    }
}
