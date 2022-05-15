namespace Infrastructure.Contracts.Authentication;
using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    // public string Username { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // public string Role { get; set; }
    // public string Team { get; set; }
}

