using Infrastructure.Enums;
using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IParcelService
    {
        public Task<Parcel> GetByTrackingId(string trackingNumber);
        public Task<IList<Parcel>> GetAllByUserId(int shipperId);
        public Task<IList<Parcel>> GetAll();
        public Task<String> Insert(Parcel newParcel);
        public Task<Parcel> Delete(string trackingNumber);
        public Task<Parcel> Update(string trackingNumber, Parcel updatedParcel);
        public Task<Parcel> UpdateParcelStatus(int id, Status status);
        public Task<Parcel> UpdateParcelStatus(string trackingNumber, Status status);
        public Task<IList<Status>> GetParcelStatus(string trackingNumber);
        public Task<Status> GetLatestParcelStatus(string trackingNumber);
    }
}
