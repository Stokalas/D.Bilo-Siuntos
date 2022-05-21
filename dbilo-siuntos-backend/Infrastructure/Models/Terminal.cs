namespace Infrastructure.Models
{
    public class Terminal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string PostalCode { get; set; }
        public string? Country { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public ICollection<Parcel>? Parcels { get; set; }
    }
}
