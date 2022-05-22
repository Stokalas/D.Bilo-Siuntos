using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;

namespace Infrastructure.Contracts.Dtos;


public class AddressDto
{
    public string Name { get; set; }
    public string LastName { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    [Phone]
    public string PhoneNumber { get; set; }
    public string City { get; set; }
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string PostalCode { get; set; }
    public string? Country { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public static Address GetAddress(AddressDto addressDto)
    {
        return new Address
        {
            Name = addressDto.Name,
            LastName = addressDto.LastName,
            Email = addressDto.Email,
            PhoneNumber = addressDto.PhoneNumber,
            City = addressDto.City,
            AddressLine1 = addressDto.AddressLine1,
            AddressLine2 = addressDto.AddressLine2,
            PostalCode = addressDto.PostalCode,
            Country = addressDto.Country,
            Latitude = addressDto.Latitude,
            Longitude = addressDto.Longitude,
        };
    }
}
