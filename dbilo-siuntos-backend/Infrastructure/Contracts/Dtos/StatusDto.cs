using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;
using Infrastructure.Enums;

namespace Infrastructure.Contracts.Dtos;


public class StatusDto
{
    public int Id { get; set; }
    public ParcelStatus ParcelStatus { get; set; }
    public string ParcelTrackingNumber { get; set; }
    public DateTime Date { get; set; }
    public AddressDto? Address { get; set; }
    public TerminalDto? Terminal { get; set; }

    public static Status GetEntity(StatusDto statusDto)
    {
        return new Status
        {
            Id = statusDto.Id,
            ParcelStatus = statusDto.ParcelStatus,
            // ParcelId = recipientDetailsDto.ParcelId,
            Date = statusDto.Date,
            Address = statusDto.Address != null ? AddressDto.GetEntity(statusDto.Address) : null,
            Terminal = statusDto.Terminal != null ? TerminalDto.GetEntity(statusDto.Terminal) : null,
        };
    }

    public static StatusDto GetDto(Status status)
    {
        return new StatusDto
        {
            Id = status.Id,
            ParcelStatus = status.ParcelStatus,
            ParcelTrackingNumber = status.Parcel.TrackingNumber,
            Date = status.Date,
            Address = status.Address != null ? AddressDto.GetDto(status.Address) : null,
            Terminal = status.Terminal != null ? TerminalDto.GetDto(status.Terminal) : null,
        };
    }
}
