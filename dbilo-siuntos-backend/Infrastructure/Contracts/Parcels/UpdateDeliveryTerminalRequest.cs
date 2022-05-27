using System.ComponentModel.DataAnnotations;
using Infrastructure.Enums;
using Infrastructure.Models;
using Infrastructure.Contracts.Dtos;

namespace Infrastructure.Contracts.Parcels;

public class UpdateDeliverypTerminalRequest
{
    [Required]
    public int DeliveryTerminalId { get; set; }
    [Required]
    public bool Overwrite { get; set; }
    [Required]
    public byte[] RowVersion { get; set; }
}

