using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    public class ParcelController : Controller
    {
        private readonly ILogger<ParcelController> _logger;
        private IParcelService _service;
        private ITrackingIdGenerator _generator;

        public ParcelController(ILogger<ParcelController> logger, IParcelService service, ITrackingIdGenerator generator)
        {
            _logger = logger;
            _service = service;
            _generator = generator;
        }

        [HttpGet("parcel/all")]
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
            parcel.TrackingNumber = _generator.GenerateId();
            var res = await _service.Insert(parcel);
            _logger.LogInformation("Executed {0}->{1}", this.GetType().Name, ControllerContext.ActionDescriptor.ActionName); //testing purposes
            return Ok(res);
        }
        
    }
}
