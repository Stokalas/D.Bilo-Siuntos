using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;

namespace Infrastructure.Contracts.Dtos;

public class UserDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // public Address? Address { get; set; }
    // public ICollection<Parcel>? Parcels { get; set; }

    public static User GetEntity(UserDto userDto)
    {
        return new User
        {
            Id = userDto.Id,
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
        };
    }

    public static UserDto GetDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
        };
    }
}
