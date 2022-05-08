using Infrastructure.Interfaces;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class TrackingNumberGenerator : ITrackingNumberGenerator
    {
        private readonly ILogger<TrackingNumberGenerator> _logger;

        public TrackingNumberGenerator(ILogger<TrackingNumberGenerator> logger)
        {
            _logger = logger;
        }

        public string GenerateNumber()
        {
            Guid g = Guid.NewGuid();
            var trackingNumber = g.ToString().Remove(0, 24);
            _logger.LogInformation("Executed {0}->Generated new trackingNumber", this.GetType().Name);
            return trackingNumber;
        }
    }
}
