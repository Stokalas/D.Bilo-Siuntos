using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface ITrackingNumberGenerator
    {
        public Parcel GenerateNumber(Parcel parcel, string username);
    }
}