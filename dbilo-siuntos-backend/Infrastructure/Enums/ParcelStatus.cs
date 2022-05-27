using System.ComponentModel;

namespace Infrastructure.Enums
{
    public enum ParcelStatus
    {
        // Terminal statuses - Awaiting Posting, Posted In Terminal, Travelling, Ready For Pickup, Collected
        // Courier statuses - Ordered, Collected From Pickup, Travelling, Out For Delivery, Delivered
        // General - Canceled, Completed
        ToBePostedInTerminal, PostedInTerminal, Travelling, ReadyForPickup, Collected,
        AwaitingCourierPickup, CollectedByCourier, OutForDelivery, Delivered,
        Canceled
    }
}
