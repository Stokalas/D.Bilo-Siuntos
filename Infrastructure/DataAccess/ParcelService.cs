using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataAccess
{
    public class ParcelService : IParcelService
    {
        private readonly DatabaseContext _dbContext;

        public ParcelService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Parcel> GetByTrackingId(string trackingId)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingId);
                if (parcel == null)
                {
                    return null;
                }
                return parcel;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<Parcel>> GetAllByUserId(int id)
        {
            try
            {
                return await _dbContext.Parcels.Where(x => x.ShipperID == id).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<Parcel>> GetAll()
        {
            try
            {
                return await _dbContext.Parcels.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task Insert(Parcel newParcel)
        {
            try
            {
                await _dbContext.Parcels.AddAsync(newParcel);
                await _dbContext.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Parcel> Delete(string trackingId)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingId);
                if (parcel == null)
                {
                    return null;
                }
                _dbContext.Parcels.Remove(parcel);
                await _dbContext.SaveChangesAsync();
                return parcel;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Parcel> Update(string trackingId, Parcel updatedParcel)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingId);
                if (parcel == null)
                {
                    return null;
                }
                parcel.ShipmentDate = updatedParcel.ShipmentDate;
                parcel.ShippingAddress = updatedParcel.ShippingAddress;

                parcel.DeliveryDate = updatedParcel.DeliveryDate;
                parcel.DeliveryAddress = updatedParcel.DeliveryAddress;

                _dbContext.Parcels.Update(parcel);
                await _dbContext.SaveChangesAsync();
                return parcel;
            }
            catch
            {
                throw;
            }
        }
    }
}
