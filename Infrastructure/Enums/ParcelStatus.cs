using System.ComponentModel;

namespace Infrastructure.Enums
{
    public enum ParcelStatus
    {
        LabelCreated,
        Shipped,
        OutForDelivery,
        Delivered,
        ReadyForPickup,
        Exception
    }
}
