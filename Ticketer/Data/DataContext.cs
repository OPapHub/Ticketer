using Microsoft.EntityFrameworkCore;
using Ticketer.Enums;
using Ticketer.Models;

namespace Ticketer.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Auditorium> Auditoriums { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Reserved_Seat> Reserved_Seats { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .Property(x => x.MovieState)
                .HasConversion(
                    v => v.ToString(),
                    v => (MovieState)Enum.Parse(typeof(MovieState), v));

            modelBuilder.Entity<Reserved_Seat>()
                .HasOne(rs => rs.Seat) // Assuming ReservedSeat has a navigation property named Seat
                .WithMany(s => s.Reserved_Seats) // Assuming Seat has a collection property named ReservedSeats
                .HasForeignKey(rs => rs.Seat_Id)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Reserved_Seat>()
                .HasOne(rs => rs.Ticket) // Assuming ReservedSeat has a navigation property named Seat
                .WithMany(s => s.Reserved_Seats) // Assuming Seat has a collection property named ReservedSeats
                .HasForeignKey(rs => rs.Ticket_Id)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
