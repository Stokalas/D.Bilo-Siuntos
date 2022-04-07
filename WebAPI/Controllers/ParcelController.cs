using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    public class ParcelController : Controller
    {
        private readonly ILogger<ParcelController> _logger;
        public ParcelController(ILogger<ParcelController> logger)
        {
            _logger = logger;
        }
        private IEnumerable<Parcel> repo = new[]
            {
                new Parcel { Id = 1, TrackingNumber = Guid.NewGuid().ToString()},
                new Parcel { Id = 2, TrackingNumber = Guid.NewGuid().ToString()},
                new Parcel { Id = 3, TrackingNumber = Guid.NewGuid().ToString()}
            }; //Repository simulation


        /*
         * Only a mock, I think there's no DB infrastructure yet, and Parcel properties will change...
         * We shouldn't use EF here :)
        */
        [HttpGet("parcel/all")]
        public ActionResult<IEnumerable<Parcel>> Get()
        {
            _logger.LogInformation("Received GET request at parcel/all"); //testing purposes
            return Ok(repo);
        }

        [HttpPost("parcel")]
        public ActionResult<Parcel> Post(Parcel parcel)
        {
            _logger.LogInformation("Received Post request at parcel\n"+parcel.ToString()); //testing purposes
            return Ok(parcel);
        }
        
        [HttpGet("parcel/{id}")]
        public ActionResult<Parcel> GetParcel(int id)
        {
            _logger.LogInformation("Received GET request at parcel/"+id); //testing purposes
            return Ok(repo.Where(p => p.Id == id));
        }
    }
}
