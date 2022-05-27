using System.ComponentModel.DataAnnotations;
using Infrastructure.Enums;
using Infrastructure.Models;
using Infrastructure.Contracts.Dtos;

namespace Infrastructure.Contracts.Parcels;

public class PostParcelRequest
{
    public int? UserId { get; set; }
    [Required]
    public ParcelSize Size { get; set; }

    public AddressDto? PickupAddress { get; set; }

    public AddressDto? DeliveryAddress { get; set; }
    public int? PickupTerminalId { get; set; }

    public int? DeliveryTerminalId { get; set; }

    [Required]
    public RecipientDetailsDto ShipperDetails { get; set; }

    [Required]
    public RecipientDetailsDto ReceiverDetails { get; set; }

    public static Parcel GetParcel(PostParcelRequest request)
    {
        return new Parcel
        {
            Size = request.Size,
            DeliveryAddress = request.DeliveryAddress != null ? AddressDto.GetEntity(request.DeliveryAddress) : null,
            PickupAddress = request.PickupAddress != null ? AddressDto.GetEntity(request.PickupAddress) : null,
            ShipperDetails = RecipientDetailsDto.GetEntity(request.ShipperDetails),
            ReceiverDetails = RecipientDetailsDto.GetEntity(request.ReceiverDetails),
        };
    }
}

