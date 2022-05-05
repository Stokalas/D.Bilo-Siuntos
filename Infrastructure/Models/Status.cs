using Infrastructure.Enums;

namespace Infrastructure.Models
{
    public class Status
    {
        public int Id { get; set; }
        public ParcelStatus ParcelStatus { get; set; }
        public Parcel Parcel { get; set; }
        public DateTime Date { get; set; }
    }
}
