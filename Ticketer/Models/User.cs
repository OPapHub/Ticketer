﻿using System.ComponentModel.DataAnnotations;

namespace Ticketer.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string BirthDate { get; set; } = string.Empty;
        public string Sex {  get; set; } = string.Empty;
        public int MovieTheathreId { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        //TODO: Add Role
        //public string Role { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string? VerificationToken { get; set; }
        public DateTime? VerifiedAt { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }

        public List<Ticket> Tickets { get; set; } = new();
    }
}
