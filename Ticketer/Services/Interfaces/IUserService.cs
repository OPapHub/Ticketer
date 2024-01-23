using Microsoft.AspNetCore.Mvc;

namespace TicketerApi.Services.Interfaces
{
    public interface IUserService
    {
        public Task<IActionResult> CreateUserAsync();
    }
}
