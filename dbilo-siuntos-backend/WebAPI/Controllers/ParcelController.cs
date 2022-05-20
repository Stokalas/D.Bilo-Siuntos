using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Cookies")]
    [ApiController]
    public class ParcelController : Controller
    {
        private readonly ILogger<ParcelController> _logger;
        private IParcelService _service;
        private ITrackingNumberGenerator _generator;

        public ParcelController(ILogger<ParcelController> logger, IParcelService service, ITrackingNumberGenerator generator)
        {
            _logger = logger;
            _service = service;
            _generator = generator;
        }

        [HttpGet("parcel/all")]
        [Authorize(AuthenticationSchemes = "Cookies", Roles = UserRoles.Admin + "," + UserRoles.User)]
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
            parcel.TrackingNumber = _generator.GenerateNumber();
            var res = await _service.Insert(parcel);
            _logger.LogInformation("Executed {0}->{1}", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
            return Ok(res);
        }

        [HttpPut("parcel/{trackingNumber}")]
        public async Task<ActionResult<Parcel>> UpdateParcel(string trackingNumber, Parcel parcel)
        {
            try
            {
                if (trackingNumber != parcel.TrackingNumber)
                {
                    _logger.LogError("Parcel trackingNumber mismatch");
                    return BadRequest("Parcel trackingNumber mismatch");
                }
                    

                var parcel_to_update = await _service.GetByTrackingId(trackingNumber);

                if (parcel_to_update == null)
                {
                    _logger.LogWarning($"Parcel with trackingNumber = {trackingNumber} not found");
                    return NotFound($"Parcel with trackingNumber = {trackingNumber} not found");
                }
                parcel_to_update.DeliveryAddress = parcel_to_update.ShippingAddress;
                return await _service.Update(trackingNumber, parcel_to_update);
            }
            catch (Exception)
            {
                _logger.LogError("Error updating Parcel");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

    }
}
