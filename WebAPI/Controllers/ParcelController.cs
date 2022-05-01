using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;

namespace WebAPI.Controllers
{
    [ApiController]
    public class ParcelController : Controller
    {
        private readonly ILogger<ParcelController> _logger;
        private IParcelService _service;

        public ParcelController(ILogger<ParcelController> logger, IParcelService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet("parcel/all")]
        public async Task<ActionResult<IEnumerable<Parcel>>> Get()
        {
            _logger.LogInformation("Received GET request at parcel/all"); //testing purposes
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("parcel/{id}")]
        public async Task<ActionResult<Parcel>> GetParcel(int id)
        {
            _logger.LogInformation("Received GET request at parcel/" + id); //testing purposes
            var res = await _service.GetAllByUserId(id);

            return Ok(res);
        }

        [HttpPost("parcel")]
        public async Task<ActionResult<Parcel>> Post(Parcel parcel)
        {
            await _service.Insert(parcel);
            _logger.LogInformation("Received Post request at parcel\n"+parcel.ToString()); //testing purposes
            return Ok();
        }
        
    }
}
