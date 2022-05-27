﻿using Infrastructure.Interfaces;
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

        public Parcel GenerateNumber(Parcel parcel)
        {
            Guid g = Guid.NewGuid();
            var trackingNumber = g.ToString().Remove(0, 24);
            parcel.TrackingNumber = trackingNumber;
            _logger.LogInformation("Executed {0}->{1}", this.GetType().Name, MethodBase.GetCurrentMethod().Name);
            return parcel;
        }
    }
}
