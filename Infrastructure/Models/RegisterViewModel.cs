using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models;

public class RegisterViewModel
{
    [Required]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(60, MinimumLength = 3)]
    public string Password { get; set; }
}