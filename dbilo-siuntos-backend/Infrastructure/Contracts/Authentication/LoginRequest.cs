namespace Infrastructure.Contracts.Authentication;
using System.ComponentModel.DataAnnotations;

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

