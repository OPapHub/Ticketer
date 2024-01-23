namespace Ticketer.Models
{
    public class Reserved_Seat
    {
        public int Id { get; set; }
        public int Seat_Id { get; set; }
        public int Ticket_Id { get; set; }
        public Seat Seat { get; set; } = new();
        public Schedule Schedule { get; set; } = new();
        public Ticket Ticket { get; set; } = new();        
    }
}
