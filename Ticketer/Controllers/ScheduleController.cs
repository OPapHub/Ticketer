using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketer.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Ticketer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private DataContext _dataContext;

        public ScheduleController(DataContext dataContext) {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> ScheduleByDateAndCity(DateTime date, string city)
        {
            var schedules = await _dataContext.Schedules.Where(x => x.Time == date && x.Movie_Theatre.City == city).ToArrayAsync();

            if(schedules is null) return NotFound();

            return Ok(schedules);
        }
        [HttpGet]
        public async Task<IActionResult> ScheduleByCity(string city)
        {
            var schedules = await _dataContext.Schedules.Where(x => x.Movie_Theatre.City == city).ToArrayAsync();

            if (schedules is null) return NotFound();

            return Ok(schedules);
        }
    }
}
