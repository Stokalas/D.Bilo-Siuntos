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

        public RecipientDetails ShipperDetails { get; set; }
        public RecipientDetails ReceiverDetails { get; set; }

        public User? Shipper { get; set; }

        public Address? PickupAddress { get; set; }
        public Address? DeliveryAddress { get; set; }

        public ICollection<Status> Status { get; set; }

        public Terminal? PickupTerminal { get; set; }
        public Terminal? DeliveryTerminal { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
