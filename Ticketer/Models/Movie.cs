using System.ComponentModel.DataAnnotations;
using Ticketer.Enums;

namespace Ticketer.Models
{
    public class Movie
    {        
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Director { get; set; } = string.Empty;
        public string Cast { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string Language { get; set; } = string.Empty;
        public string Production { get; set; } = string.Empty;        
        public string AgeRestriction { get; set; } = string.Empty;
        public int ReleaseYear { get; set; }
        [Url]
        public string Trailer { get; set; } = string.Empty;
        [Url]
        public string Poster { get; set; } = string.Empty;
        public MovieState MovieState { get; set; }           
        public double Rating { get; set; }       

        public List<Schedule> Schedules { get; set; } = new();
        public List<Genre> Genres { get; set; } = new();
    }
}
