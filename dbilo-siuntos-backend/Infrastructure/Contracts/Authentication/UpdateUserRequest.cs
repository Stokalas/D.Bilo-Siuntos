﻿namespace Infrastructure.Contracts.Authentication;

public class UpdateUserRequest
{
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // public string TeamRole { get; set; }
}

