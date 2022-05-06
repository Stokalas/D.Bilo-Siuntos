namespace Infrastructure.Models
{
    public class User
    {
        public int Id { get; set; }
        public Address Address { get; set; }

        public ICollection<Parcel>? Parcels { get; set; }
    }
}
