using System.ComponentModel.DataAnnotations;

namespace TicketerApi.Dto.UserDto
{
    public class UserResetPasswordRequest
    {
        [Required]
        public string Token { get; set; } = string.Empty;
        [Required]
        [MinLength(6), MaxLength(20)]
        [RegularExpression(@"^[a-zA-Z0-9@_]+$", ErrorMessage = "Only letters, numbers, @, _ are allowed.")]
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
