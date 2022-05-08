using Infrastructure.Interfaces;

namespace Infrastructure.Services
{
    public class TrackingIdGenerator : ITrackingIdGenerator
    {
        public string GenerateId()
        {
            Guid g = Guid.NewGuid();
            var trackingId = g.ToString().Remove(0, 24);
            return trackingId;
        }
    }
}
