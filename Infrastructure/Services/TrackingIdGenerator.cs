using Infrastructure.Interfaces;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class TrackingIdGenerator : ITrackingIdGenerator
    {
        private readonly ILogger<TrackingIdGenerator> _logger;

        public TrackingIdGenerator(ILogger<TrackingIdGenerator> logger)
        {
            _logger = logger;
        }

        public string GenerateId()
        {
            Guid g = Guid.NewGuid();
            var trackingId = g.ToString().Remove(0, 24);
            _logger.LogInformation("Executed {0}->Generated new trackingId", this.GetType().Name);
            return trackingId;
        }
    }
}
