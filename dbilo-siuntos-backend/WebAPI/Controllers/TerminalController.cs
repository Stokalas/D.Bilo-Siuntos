using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Contracts.Parcels;
using Infrastructure.Contracts.Dtos;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers;

[ApiController]
public class TerminalController : Controller
{

    private readonly ILogger<TerminalController> _logger;
    private ITerminalService _service;

    public TerminalController(ILogger<TerminalController> logger, ITerminalService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("terminal/all")]
    public async Task<ActionResult<IEnumerable<TerminalDto>>> Get()
    {
        _logger.LogInformation("Executed {0}->{1}", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
        var result = await _service.GetAll();
        return Ok(result.Select(t => TerminalDto.GetDto(t)).ToList());
    }

    [HttpGet("terminal/{id}")]
    public async Task<ActionResult<TerminalDto>> GetParcel(int id)
    {
        _logger.LogInformation("Executed {0}->{1}({2})", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName, id); ; //testing purposes
        var res = await _service.GetById(id);

        return Ok(TerminalDto.GetDto(res));
    }
}