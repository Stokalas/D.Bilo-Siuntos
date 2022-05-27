using System.ComponentModel.DataAnnotations;
using Infrastructure.Models;

namespace Infrastructure.Contracts.Dtos;


public class TerminalDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public AddressDto Address { get; set; }

    public static Terminal GetEntity(TerminalDto terminalDto)
    {
        return new Terminal
        {
            Id = terminalDto.Id,
            Name = terminalDto.Name,
            Address = terminalDto.Address != null ? AddressDto.GetEntity(terminalDto.Address) : null,
        };
    }

    public static TerminalDto GetDto(Terminal terminal)
    {
        return new TerminalDto
        {
            Id = terminal.Id,
            Name = terminal.Name,
            Address = terminal.Address != null ? AddressDto.GetDto(terminal.Address) : null,
        };
    }
}
