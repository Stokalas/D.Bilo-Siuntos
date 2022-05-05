using Infrastructure.Enums;
using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IParcelService
    {
        public Task<Parcel> GetByTrackingId(string trackingId);
        public Task<IList<Parcel>> GetAllByUserId(int id);
        public Task<IList<Parcel>> GetAll();
        public Task<String> Insert(Parcel newParcel);
        public Task<Parcel> Delete(string trackingId);
        public Task<Parcel> Update(string trackingId, Parcel updatedParcel);
        public Task<Parcel> UpdateParcelStatus(string trackingId, Status status);
        public Task<IList<Status>> GetParcelStatus(string trackingId);
        public Task<Status> GetLatestParcelStatus(string trackingId);
    }
}
