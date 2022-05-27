using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    //[Authorize(AuthenticationSchemes = "Cookies")]
    [ApiController]
    public class ParcelController : Controller
    {
        private readonly ILogger<ParcelController> _logger;
        private IParcelService _service;
        private ITrackingNumberGenerator _generator;
        private IEmailSender _emailSender;

        public ParcelController(ILogger<ParcelController> logger, IParcelService service, ITrackingNumberGenerator generator, IEmailSender emailSender)
        {
            _logger = logger;
            _service = service;
            _generator = generator;
            _emailSender = emailSender;
        }

        [HttpGet("parcel/all")]
        //[Authorize(AuthenticationSchemes = "Cookies", Roles = UserRoles.Admin + "," + UserRoles.User)]
        public async Task<ActionResult<IEnumerable<Parcel>>> Get()
        {
            _logger.LogInformation("Executed {0}->{1}", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("parcel/{trackingNumber}")]
        public async Task<ActionResult<Parcel>> GetParcel(string trackingNumber)
        {
            _logger.LogInformation("Executed {0}->{1}({2})", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName, trackingNumber); ; //testing purposes
            var res = await _service.GetByTrackingId(trackingNumber);
            return Ok(res);
        }

        [HttpPost("parcel")]
        public async Task<ActionResult<Parcel>> Post(Parcel parcel)
        {
            parcel = _generator.GenerateNumber(parcel);
            //var user = User.FindFirst("name");
            var res = await _service.Insert(parcel);
            _emailSender.SendSender(parcel.ShippingAddress, parcel.TrackingNumber);
            _emailSender.SendReceiver(parcel.DeliveryAddress, parcel.TrackingNumber);
            _logger.LogInformation("Executed {0}->{1}", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
            return Ok(res);
        }

    }
}
