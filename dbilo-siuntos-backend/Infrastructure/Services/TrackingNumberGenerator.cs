using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace Infrastructure.Services
{
    public class TrackingNumberGenerator : ITrackingNumberGenerator
    {
        private readonly ILogger<TrackingNumberGenerator> _logger;

        public TrackingNumberGenerator(ILogger<TrackingNumberGenerator> logger)
        {
            _logger = logger;
        }

        public Parcel GenerateNumber(Parcel parcel, string username)
        {
            Guid g = Guid.NewGuid();
            var trackingNumber = g.ToString().Remove(0, 24);
            parcel.TrackingNumber = trackingNumber;
            _logger.LogInformation("User {0} Executed {1}->{2}", username, this.GetType().Name, MethodBase.GetCurrentMethod().Name);
            return parcel;
        }
    }
}
