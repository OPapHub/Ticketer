using Microsoft.AspNetCore.Mvc;
using Ticketer.Data;
using Ticketer.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using TicketerApi.Dto.UserDto;
using AutoMapper;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Ticketer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public UserController(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequest request)
        {

            if (_dataContext.Users.Any(u => u.Email == request.Email))
            {
                return BadRequest("User already exists"); // Change to not reveal info
            }

            CreatePasswordHash(request.Password,
                out byte[] passwordHash,
                out byte[] passwordSalt);

            var user = new User
            {
                //Role = "user",
                Name = "Username",
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken()
            };

            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user is null)
            {
                return BadRequest("User not found");
            }

            //if (user.VerifiedAt is null)
            //{
            //    return BadRequest("User is not verified. Please verify your account and try again");
            //}

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Password is incorrect. Try again or click \"Forgot Password\" to reset"); // Change
            }

            //string token = CreateToken(user);

            return Ok(user);

        }

        [HttpGet("info/{id}")]
        public async Task<IActionResult> Info(int id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user is null)
            {
                return BadRequest("No User Found");
            }

            return Ok(user);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user is null)
            {
                return BadRequest("No user found");
            }

            _dataContext.Users.Remove(user);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }


        [HttpPost("verify")]
        public async Task<IActionResult> Verify(UserVerifyRequest request)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.VerificationToken == request.Token);
            if (user is null)
            {
                return BadRequest("Invalid Token");
            }

            user.VerifiedAt = DateTime.Now;
            user.VerificationToken = null;
            await _dataContext.SaveChangesAsync();

            return Ok("User verified");

        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.Email == email);
            if (user is null)
            {
                return BadRequest("User not found");
            }

            user.PasswordResetToken = CreateRandomToken();
            user.ResetTokenExpires = DateTime.Now.AddDays(1);
            await _dataContext.SaveChangesAsync();

            return Ok("You may now reset your password");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(UserResetPasswordRequest request)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.PasswordResetToken == request.Token);
            if (user is null || user.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("Invalid Token");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.PasswordResetToken = null;
            user.ResetTokenExpires = null;

            await _dataContext.SaveChangesAsync();

            return Ok("Password has been successfully reset");

        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private string CreateRandomToken()
        {
            var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
            if (_dataContext.Users.Any(u => u.PasswordResetToken == token))
            {
                CreateRandomToken();
            }
            return token;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
