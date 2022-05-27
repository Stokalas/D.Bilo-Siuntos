using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;

namespace Infrastructure.Contracts.Dtos;


public class RecipientDetailsDto
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [Phone]
    public string PhoneNumber { get; set; }

    public static RecipientDetails GetEntity(RecipientDetailsDto recipientDetailsDto)
    {
        return new RecipientDetails
        {
            FirstName = recipientDetailsDto.FirstName,
            LastName = recipientDetailsDto.LastName,
            Email = recipientDetailsDto.Email,
            PhoneNumber = recipientDetailsDto.PhoneNumber,
        };
    }

    public static RecipientDetailsDto GetDto(RecipientDetails recipientDetails)
    {
        return new RecipientDetailsDto
        {
            FirstName = recipientDetails.FirstName,
            LastName = recipientDetails.LastName,
            Email = recipientDetails.Email,
            PhoneNumber = recipientDetails.PhoneNumber,
        };
    }
}
