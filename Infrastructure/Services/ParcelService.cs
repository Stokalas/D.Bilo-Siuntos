using Infrastructure.Enums;
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
                //Log error
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
                //Log error
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
                //Log error
                throw;
            }
        }

        public async Task<String> Insert(Parcel newParcel)
        {
            try
            {
                await _dbContext.Parcels.AddAsync(newParcel);
                await _dbContext.SaveChangesAsync();
                return newParcel.TrackingNumber;
            }
            catch
            {
                //Log error
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
                //Log error
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
                //Log error
                throw;
            }
        }
        public async Task<Parcel> UpdateParcelStatus(string trackingId, Status status)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingId);
                if (parcel == null)
                {
                    return null;
                }
                parcel.Status.Add(status);

                _dbContext.Parcels.Update(parcel);
                await _dbContext.SaveChangesAsync();
                return parcel;
            }
            catch
            {
                //Log error
                throw;
            }
        }
        public async Task<IList<Status>> GetParcelStatus(string trackingId)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingId);
                if (parcel == null)
                {
                    return null;
                }
                var status = parcel.Status.ToList();
                return status;
            }
            catch
            {
                //Log error
                throw;
            }
        }
        public async Task<Status> GetLatestParcelStatus(string trackingId)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingId);
                if (parcel == null)
                {
                    return null;
                }
                var status = parcel.Status.OrderByDescending(x => x.Date).FirstOrDefault();
                return status;
            }
            catch
            {
                //Log error
                throw;
            }
        }
    }
}
