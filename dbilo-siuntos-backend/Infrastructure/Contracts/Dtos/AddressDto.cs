using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;

namespace Infrastructure.Contracts.Dtos;


public class AddressDto
{
    [Required]
    public string City { get; set; }
    [Required]
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    [Required]
    public string PostalCode { get; set; }
    public string? Country { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public static Address GetEntity(AddressDto addressDto)
    {
        return new Address
        {
            City = addressDto.City,
            AddressLine1 = addressDto.AddressLine1,
            AddressLine2 = addressDto.AddressLine2,
            PostalCode = addressDto.PostalCode,
            Country = addressDto.Country,
            Latitude = addressDto.Latitude,
            Longitude = addressDto.Longitude,
        };
    }
    public static AddressDto GetDto(Address address)
    {
        return new AddressDto
        {
            City = address.City,
            AddressLine1 = address.AddressLine1,
            AddressLine2 = address.AddressLine2,
            PostalCode = address.PostalCode,
            Country = address.Country,
            Latitude = address.Latitude,
            Longitude = address.Longitude,
        };
    }
}
