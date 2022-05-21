namespace Infrastructure.Models
{
    public class Terminal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public ICollection<Parcel>? Parcels { get; set; }
    }
}
