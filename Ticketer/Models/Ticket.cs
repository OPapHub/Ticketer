namespace Ticketer.Models
{
    public class Ticket
    {
        public int Id { get; set; }        
        public Schedule Schedule { get; set; } = new();
        public User User { get; set; } = new();        
        public bool Is_Reserved { get; set; } = false;
        public bool Is_Paid { get; set; } = false;
        public bool Is_Active { get; set; } = true;
        public List<Reserved_Seat> Reserved_Seats { get; set; } = new();
    }
}
