namespace Infrastructure.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public Address? Address { get; set; }
        public string? PhoneNumber { get; set; }

        public ICollection<Parcel>? Parcels { get; set; }
    }
}
