using Infrastructure.Enums;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Contracts.Dtos;
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

        public async Task<Parcel> GetByTrackingId(string trackingNumber)
        {
            try
            {
                //var parcel = await _dbContext.Parcels.Include(c => c.PickupAddress).Include(t => t.DeliveryAddress).Include(s => s.Status).Include(v => v.Terminal).FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
                var parcel = await _dbContext.Parcels.Include(c => c.PickupAddress).Include(t => t.DeliveryAddress)
                    .Include(s => s.Status).Include(p => p.ReceiverDetails).Include(p => p.ShipperDetails)
                    .Include(p => p.PickupTerminal).ThenInclude(t => t.Address)
                    .Include(p => p.DeliveryTerminal).ThenInclude(t => t.Address).FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
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

        public async Task<IList<Parcel>> GetAllByUserId(int shipperId)
        {
            try
            {
                return await _dbContext.Parcels.Include(c => c.PickupAddress).Include(t => t.DeliveryAddress)
                .Include(s => s.Status).Include(p => p.ReceiverDetails).Include(p => p.ShipperDetails)
                .Include(p => p.PickupTerminal).ThenInclude(t => t.Address)
                .Include(p => p.DeliveryTerminal).ThenInclude(t => t.Address).Where(x => x.Shipper.Id == shipperId).ToListAsync();
                //return await _dbContext.Parcels.Include(c => c.PickupAddress).Include(t => t.DeliveryAddress).Include(s => s.Status).Include(v => v.Terminal).Where(x => x.Shipper.Id == shipperId).ToListAsync();
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
                //return await _dbContext.Parcels.Include(c => c.PickupAddress).Include(t => t.DeliveryAddress).Include(s => s.Status).Include(v => v.Terminal).ToListAsync();
                return await _dbContext.Parcels.Include(c => c.PickupAddress).Include(t => t.DeliveryAddress)
                .Include(s => s.Status).Include(p => p.ReceiverDetails).Include(p => p.ShipperDetails)
                .Include(p => p.PickupTerminal).ThenInclude(t => t.Address)
                .Include(p => p.DeliveryTerminal).ThenInclude(t => t.Address).ToListAsync();
            }
            catch
            {
                //Log error
                throw;
            }
        }

        public async Task<Parcel> Insert(Parcel newParcel)
        {
            try
            {
                await _dbContext.Parcels.AddAsync(newParcel);
                await _dbContext.SaveChangesAsync();
                return newParcel;
            }
            catch
            {
                //Log error
                throw;
            }
        }

        public async Task<Parcel> Delete(string trackingNumber)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
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

        public async Task<Parcel> Update(string trackingNumber, Parcel updatedParcel)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
                if (parcel == null)
                {
                    return null;
                }
                //parcel.ShipmentDate = updatedParcel.ShipmentDate;
                //parcel.ShippingAddress = updatedParcel.ShippingAddress;

                //parcel.DeliveryDate = updatedParcel.DeliveryDate;
                //parcel.DeliveryAddress = updatedParcel.DeliveryAddress;

                //parcel.Terminal = updatedParcel.Terminal;

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
        public async Task<Parcel> Update(int id, Parcel updatedParcel)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.Id == id);
                if (parcel == null)
                {
                    return null;
                }
                //parcel.ShipmentDate = updatedParcel.ShipmentDate;
                //parcel.ShippingAddress = updatedParcel.ShippingAddress;

                //parcel.DeliveryDate = updatedParcel.DeliveryDate;
                //parcel.DeliveryAddress = updatedParcel.DeliveryAddress;

                //parcel.Terminal = updatedParcel.Terminal;

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
        public async Task<Parcel> UpdateParcelStatus(int id, Status status)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.Id == id);
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
        public async Task<Parcel> UpdateParcelStatus(string trackingNumber, Status status)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
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
        public async Task<IList<Status>> GetParcelStatus(string trackingNumber)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
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
        public async Task<Status> GetLatestParcelStatus(string trackingNumber)
        {
            try
            {
                var parcel = await _dbContext.Parcels.FirstOrDefaultAsync(x => x.TrackingNumber == trackingNumber);
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
