using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketer.Data;
using Ticketer.Dto;
using Ticketer.Dto.MovieDto;
using Ticketer.Enums;
using Ticketer.Models;

namespace Ticketer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public MovieController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddMovie(MovieAddDto request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var movie = new Movie()
            {
                Title = request.Title,
                Director = request.Director,
                Cast = request.Cast,
                Description = request.Description,
                Duration = request.Duration,
                Language = request.Language,
                Production = request.Production,
                AgeRestriction = request.AgeRestriction,
                ReleaseYear = request.ReleaseYear,
                Trailer = request.Trailer,
                Poster = request.Poster,
                MovieState = request.MovieState,
                Rating = request.Rating
            };

            var genresAll = await _dataContext.Genres.ToListAsync();
            var genres = request.Genres.Split(' ').ToList();
            foreach (var genre in genresAll)
            {
                foreach(var item in genres)
                {
                    if(item == genre.Name)
                    {
                        movie.Genres.Add(genre);
                    }
                }
            }

            var newMovie = await _dataContext.Movies.AddAsync(movie);
            await _dataContext.SaveChangesAsync();
            return Ok(newMovie);
        }

        [HttpPost("AddGenre")]
        public async Task<IActionResult> AddGenre(GenreDto genre)
        {
            if (genre is null)
            {
                return BadRequest();
            }
            var newGenre = new Genre
            {
                Name = genre.Name
            };
            var updatedGenre = await _dataContext.Genres.AddAsync(newGenre);
            await _dataContext.SaveChangesAsync();
            return Ok(updatedGenre);
        }

        [HttpGet("GetGenres")]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _dataContext.Genres.ToListAsync();

            if (genres is null)
            {
                return BadRequest();
            }

            return Ok(genres);
        }

        [HttpPost("AddGenrestoMovie")]
        public async Task<IActionResult> AddGenresToMovie(MovieGenreDto movieGenreDto)
        {
            if (movieGenreDto is null)
            {
                return BadRequest();
            }

            var movie = await _dataContext.Movies.FirstOrDefaultAsync(x => x.Id == movieGenreDto.MovieId);
            var genre = await _dataContext.Genres.FirstOrDefaultAsync(x => x.Id == movieGenreDto.GenreId);

            if (genre is null || movie is null)
            {
                return BadRequest();
            }

            movie.Genres.Add(genre);
            genre.Movies.Add(movie);

            _dataContext.Update(movie);
            _dataContext.Update(genre);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("movies")]
        public async Task<IActionResult> Movies()
        {
            var movies = await _dataContext.Movies.Include(g => g.Genres).ToListAsync();

            if (movies is null)
            {
                return NotFound();
            }

            return Ok(movies);
        }

        [HttpGet("state/{state}")]
        public async Task<IActionResult> MoviesState(string state)
        {
            if (!Enum.TryParse(char.ToUpper(state[0]) + state.Substring(1), out MovieState movieState))
            {
                return BadRequest();
            }

            var movies = await _dataContext.Movies.Where(
                x => x.MovieState.Equals(movieState))
                .Include(g => g.Genres)
                .ToListAsync();

            if (movies is null)
            {
                return BadRequest();
            }

            return Ok(movies);
        }

        [HttpGet("movie/{id}")]
        public async Task<IActionResult> Movie(int id)
        {
            var movie = await _dataContext.Movies.Where(
                x => x.Id == id)
                .Include(g => g.Genres)
                .ToListAsync();

            if (movie is null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

    }
}
