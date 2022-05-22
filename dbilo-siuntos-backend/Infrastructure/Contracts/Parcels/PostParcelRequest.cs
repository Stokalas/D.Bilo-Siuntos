using System.ComponentModel.DataAnnotations;
using Infrastructure.Enums;
using Infrastructure.Models;
using Infrastructure.Contracts.Dtos;

namespace Infrastructure.Contracts.Parcels;

public class PostParcelRequest
{
    [Required]
    public ParcelSize Size { get; set; }

    [Required]
    public AddressDto ShippingAddress { get; set; }

    [Required]
    public AddressDto DeliveryAddress { get; set; }

    public static Parcel GetParcel(PostParcelRequest request)
    {
        return new Parcel
        {
            Size = request.Size,
            DeliveryAddress = AddressDto.GetAddress(request.DeliveryAddress),
            ShippingAddress = AddressDto.GetAddress(request.ShippingAddress),
        };
    }
}

