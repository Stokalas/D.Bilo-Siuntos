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

        /*
         * Only a mock, I think there's no DB infrastructure yet, and Parcel properties will change...
         * We shouldn't use EF here :)
        */
        [HttpGet("parcel/all")]
        public ActionResult<IEnumerable<Parcel>> Get()
        {
            _logger.LogInformation("Received GET request at parcel/all"); //testing purposes
            return new[]
            {
                new Parcel { Id = 1, TrackingNumber = Guid.NewGuid().ToString()},
                new Parcel { Id = 2, TrackingNumber = Guid.NewGuid().ToString()},
                new Parcel { Id = 3, TrackingNumber = Guid.NewGuid().ToString()}
            };
        }
    }
}
