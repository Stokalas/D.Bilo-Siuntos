using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Contracts.Parcels;
using Infrastructure.Contracts.Dtos;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

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
        var cookie_token = Request.Cookies["token"];
        var username = UserGetter(cookie_token);
        _logger.LogInformation("User {0} Executed {1}->{2}", username, this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
        var result = await _service.GetAll();
        return Ok(result.Select(t => TerminalDto.GetDto(t)).ToList());
    }

    [HttpGet("terminal/{id}")]
    public async Task<ActionResult<TerminalDto>> GetParcel(int id)
    {
        var cookie_token = Request.Cookies["token"];
        var username = UserGetter(cookie_token);
        _logger.LogInformation("User {0} Executed {0}->{1}({2})", username, this.GetType().Name, ControllerContext.ActionDescriptor.ActionName, id); ; //testing purposes
        var res = await _service.GetById(id);

        return Ok(TerminalDto.GetDto(res));
    }

    private string UserGetter(string cookie)
    {
        if (cookie != null)
        {
            var token = new JwtSecurityTokenHandler().ReadJwtToken(cookie);
            return token.Claims.First(claim => claim.Type == "email").Value;
        }
        return "Guest";
    }
}