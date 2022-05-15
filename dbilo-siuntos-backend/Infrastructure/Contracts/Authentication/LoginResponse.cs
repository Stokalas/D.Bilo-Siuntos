namespace Infrastructure.Contracts.Authentication;

public class LoginResponse
{
    // public string Username { get; set; }

    public string Email { get; set; }
    public int ID { get; set; }
    // public string TeamRole { get; set; }//FE, BE, QA...
    public string? Role { get; set; } //ADMIN, USER, etc...
}

