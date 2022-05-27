using Infrastructure.Interfaces;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CountryGenerator : ITrackingNumberGenerator
    {
        protected readonly ITrackingNumberGenerator _trackingNumberGenerator;

        public CountryGenerator(ITrackingNumberGenerator trackingNumberGenerator)
        {
            this._trackingNumberGenerator = trackingNumberGenerator;
        }
        public Parcel GenerateNumber(Parcel parcel)
        {
            var tmp = this._trackingNumberGenerator.GenerateNumber(parcel);
            switch (parcel.DeliveryAddress.Country)
            {
                case "Lithuania":
                    tmp.TrackingNumber = $"LT{tmp.TrackingNumber}";
                    break;
                case "Poland":
                    tmp.TrackingNumber = $"PL{tmp.TrackingNumber}";
                    break;
                case "Latvia":
                    tmp.TrackingNumber = $"LV{tmp.TrackingNumber}";
                    break;
                case "Estonia":
                    tmp.TrackingNumber = $"EE{tmp.TrackingNumber}";
                    break;
                default:
                    tmp.TrackingNumber = $"XX{tmp.TrackingNumber}";
                    break;

            }
            return tmp;
        }
    }
}
