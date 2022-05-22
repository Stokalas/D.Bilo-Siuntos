using Infrastructure.Enums;
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models
{
    public class Parcel
    {
        public int Id { get; set; }
        [Key]
        public string TrackingNumber { get; set; }
        public ParcelSize Size { get; set; }

        public User? Shipper { get; set; }
        public DateTime? ShipmentDate { get; set; } 
        public Address ShippingAddress { get; set; }

        public DateTime? DeliveryDate { get; set; }
        public Address DeliveryAddress { get; set; }

        public ICollection<Status> Status { get; set; }
    }
}
