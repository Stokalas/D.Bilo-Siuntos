using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public enum Size
    {
        S, M, L, XL
    }
    public class Parcel
    {
        public int Id { get; set; }
        [Key]
        public string? TrackingNumber { get; set; }
        public Size? Size { get; set; }

        public int? ShipperID { get; set; }
        public DateTime ShipmentDate { get; set; }
        public Address? ShippingAddress { get; set; }

        public DateTime DeliveryDate { get; set; }
        public virtual Address? DeliveryAddress { get; set; }
    }
}
