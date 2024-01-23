using System.ComponentModel.DataAnnotations;

namespace TicketerApi.Dto.UserDto
{
    public class UserVerifyRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Token { get; set; } = string.Empty;
    }
}
