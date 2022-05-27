using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Contracts.Authentication;

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public bool Remember { get; set; }
}

