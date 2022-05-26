namespace Infrastructure.Contracts.Authentication;

public class LoginResponse
{
    public string Email { get; set; }
    public int ID { get; set; }
    public string? Role { get; set; } //ADMIN, USER, etc...
}

