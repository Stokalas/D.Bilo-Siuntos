using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models;

public class User : IdentityUser<int>
{
    [MaxLength(50)]
    public string FirstName { get; set; }
    [MaxLength(50)]
    public string LastName { get; set; }
    public Address? Address { get; set; }
    public ICollection<Parcel>? Parcels { get; set; }
}

