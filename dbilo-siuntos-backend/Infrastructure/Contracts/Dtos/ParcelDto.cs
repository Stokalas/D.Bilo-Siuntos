using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;
using Infrastructure.Enums;

namespace Infrastructure.Contracts.Dtos;


public class ParcelDto
{
    public int Id { get; set; }
    [Key]
    public string TrackingNumber { get; set; }
    public ParcelSize Size { get; set; }

    public RecipientDetailsDto ShipperDetails { get; set; }
    public RecipientDetailsDto ReceiverDetails { get; set; }

    public UserDto? Shipper { get; set; }

    public AddressDto? PickupAddress { get; set; }
    public AddressDto? DeliveryAddress { get; set; }

    public ICollection<StatusDto> Status { get; set; }

    public TerminalDto? PickupTerminal { get; set; }
    public TerminalDto? DeliveryTerminal { get; set; }

    public byte[] RowVersion { get; set; }

    public static Parcel GetEntity(ParcelDto parcelDto)
    {
        return new Parcel
        {
            Id = parcelDto.Id,
            TrackingNumber = parcelDto.TrackingNumber,
            Size = parcelDto.Size,
            ShipperDetails = RecipientDetailsDto.GetEntity(parcelDto.ShipperDetails),
            ReceiverDetails = RecipientDetailsDto.GetEntity(parcelDto.ReceiverDetails),
            Shipper = parcelDto.Shipper != null ? UserDto.GetEntity(parcelDto.Shipper) : null,
            PickupAddress = parcelDto.PickupAddress != null ? AddressDto.GetEntity(parcelDto.PickupAddress) : null,
            PickupTerminal = parcelDto.PickupTerminal != null ? TerminalDto.GetEntity(parcelDto.PickupTerminal) : null,
            DeliveryTerminal = parcelDto.DeliveryTerminal != null ? TerminalDto.GetEntity(parcelDto.DeliveryTerminal) : null,
            DeliveryAddress = parcelDto.DeliveryAddress != null ? AddressDto.GetEntity(parcelDto.DeliveryAddress) : null,
            //status to be done
        };
    }

    public static ParcelDto GetDto(Parcel parcel)
    {
        return new ParcelDto
        {
            Id = parcel.Id,
            TrackingNumber = parcel.TrackingNumber,
            Size = parcel.Size,
            ShipperDetails = RecipientDetailsDto.GetDto(parcel.ShipperDetails),
            ReceiverDetails = RecipientDetailsDto.GetDto(parcel.ReceiverDetails),
            Shipper = parcel.Shipper != null ? UserDto.GetDto(parcel.Shipper) : null,
            PickupAddress = parcel.PickupAddress != null ? AddressDto.GetDto(parcel.PickupAddress) : null,
            PickupTerminal = parcel.PickupTerminal != null ? TerminalDto.GetDto(parcel.PickupTerminal) : null,
            DeliveryTerminal = parcel.DeliveryTerminal != null ? TerminalDto.GetDto(parcel.DeliveryTerminal) : null,
            DeliveryAddress = parcel.DeliveryAddress != null ? AddressDto.GetDto(parcel.DeliveryAddress) : null,
            Status = parcel.Status != null ? parcel.Status.Select(s => StatusDto.GetDto(s)).ToList() : null,
            RowVersion = parcel.RowVersion,
        };
    }
}
