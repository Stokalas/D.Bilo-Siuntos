using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Contracts.Parcels;
using Infrastructure.Contracts.Dtos;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

namespace WebAPI.Controllers
{
    [ApiController]
    public class ParcelController : Controller
    {
        private readonly ILogger<ParcelController> _logger;
        private IParcelService _service;
        private ITerminalService _terminalService;
        private IUserService _userService;
        private ITrackingNumberGenerator _generator;
        private IEmailSender _emailSender;

        public ParcelController(ILogger<ParcelController> logger, IParcelService service, ITerminalService terminalService, IUserService userService, ITrackingNumberGenerator generator, IEmailSender emailSender)
        {
            _logger = logger;
            _service = service;
            _terminalService = terminalService;
            _userService = userService;
            _generator = generator;
            _emailSender = emailSender;
        }

        [HttpGet("parcel/all")]
        [Authorize(AuthenticationSchemes = "Cookies", Roles = UserRoles.Admin + "," + UserRoles.User)]
        public async Task<ActionResult<IEnumerable<Parcel>>> Get()
        {
            var cookie_token = Request.Cookies["token"];
            var username = UserGetter(cookie_token);
            _logger.LogInformation("User {0} Executed {1}->{2}", username, this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("parcel/{trackingNumber}")]
        public async Task<ActionResult<ParcelDto>> GetParcel(string trackingNumber)
        {
            var cookie_token = Request.Cookies["token"];
            var username = UserGetter(cookie_token);
            _logger.LogInformation("User {0} executed {1}->{2}({3})", username, this.GetType().Name, ControllerContext.ActionDescriptor.ActionName, trackingNumber); ; //testing purposes
            var res = await _service.GetByTrackingId(trackingNumber);

            return Ok(ParcelDto.GetDto(res));
        }

        [HttpPut("parcel/{trackingNumber}")]
        public async Task<ActionResult<ParcelDto>> UpdateDeliveryTerminal(string trackingNumber, UpdateDeliverypTerminalRequest request)
        {
            _logger.LogInformation("Executed {0}->{1}({2})", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName, trackingNumber); ; //testing purposes
            var existingParcel = await _service.GetByTrackingId(trackingNumber);
            var terminal = await _terminalService.GetById(request.DeliveryTerminalId);
            if (existingParcel == null)
            {
                return BadRequest(new BadRequestObjectResult($"Parcel with {trackingNumber} Id not found"));
            }
            if (terminal == null)
            {
                return BadRequest(new BadRequestObjectResult($"Terminal with {request.DeliveryTerminalId} Id not found"));
            }
            existingParcel.DeliveryTerminal = terminal;
            try
            {
                var res = await _service.Update(trackingNumber, existingParcel, request.Overwrite);

                return Ok(ParcelDto.GetDto(res));
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new BadRequestObjectResult($"Concurrency Error!"));
            }
            catch (System.Exception)
            {
                return BadRequest(new BadRequestObjectResult($"Something went wrong!"));
            }
        }

        [HttpPost("parcel")]
        public async Task<ActionResult<ParcelDto>> Post(PostParcelRequest request)
        {
            var cookie_token = Request.Cookies["token"];
            var username = UserGetter(cookie_token);
            var parcel = PostParcelRequest.GetParcel(request);

            if (request.PickupTerminalId.HasValue)
            {
                if (request.PickupAddress != null)
                {
                    return BadRequest(new BadRequestObjectResult("Cannot have pickup address and pickup terminal for the same parcel"));
                }
                var pickupTerminal = await _terminalService.GetById(request.PickupTerminalId.Value);
                if (pickupTerminal == null)
                {
                    return BadRequest(new BadRequestObjectResult($"Terminal with {request.PickupTerminalId.Value} Id not found"));
                }
                var status = new List<Status>() {
                    new Status
                    {
                        ParcelStatus = Infrastructure.Enums.ParcelStatus.ToBePostedInTerminal,
                        Date = DateTime.UtcNow,
                        Parcel = parcel,
                        Terminal = pickupTerminal,
                    }
                 };
                parcel.PickupTerminal = pickupTerminal;
                parcel.Status = status;
            }
            if (request.DeliveryTerminalId.HasValue)
            {
                if (request.DeliveryAddress != null)
                {
                    return BadRequest(new BadRequestObjectResult("Cannot have delivery address and delivery terminal for the same parcel"));
                }
                var deliveryTerminal = await _terminalService.GetById(request.DeliveryTerminalId.Value);
                if (deliveryTerminal == null)
                {
                    return BadRequest(new BadRequestObjectResult($"Terminal with {request.DeliveryTerminalId.Value} Id not found"));
                }
                parcel.DeliveryTerminal = deliveryTerminal;
            }
            if (request.UserId.HasValue)
            {
                var user = await _userService.GetById(request.UserId.Value);
                if (user == null)
                {
                    return BadRequest(new BadRequestObjectResult($"User with {request.UserId.Value} Id not found"));
                }
                parcel.Shipper = user;
            }
            if (request.PickupAddress != null)
            {
                var status = new List<Status>() {
                    new Status
                    {
                        ParcelStatus = Infrastructure.Enums.ParcelStatus.AwaitingCourierPickup,
                        Date = DateTime.UtcNow,
                        Parcel = parcel,
                        Address = parcel.PickupAddress
                    }
                 };
                parcel.Status = status;
            }

            parcel = _generator.GenerateNumber(parcel, username);
            var res = await _service.Insert(parcel);
            _emailSender.SendSender(parcel.ShipperDetails, parcel.TrackingNumber, username);
            if (parcel.PickupAddress != null)
            {
                _emailSender.SendReceiver(parcel.ReceiverDetails, parcel.PickupAddress, parcel.TrackingNumber, username);
            }
            else
            {
                _emailSender.SendReceiver(parcel.ReceiverDetails, parcel.PickupTerminal!.Address, parcel.TrackingNumber, username);
            }

            _logger.LogInformation("User {0} Executed {1}->{2}", username, this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes

            return Ok(ParcelDto.GetDto(res));
        }
        private string UserGetter(string? cookie)
        {
            if (cookie != null)
            {
                var token = new JwtSecurityTokenHandler().ReadJwtToken(cookie);
                return token.Claims.First(claim => claim.Type == "email").Value;
            }
            return "Guest";
        }

    }

}