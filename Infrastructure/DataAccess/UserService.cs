﻿using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataAccess
{
    public class AddressService : IUserService
    {
        private readonly DatabaseContext _dbContext;

        public AddressService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetById(int id)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
                if (user == null)
                {
                    return null;
                }
                return user;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<User>> GetAll()
        {
            try
            {
                return await _dbContext.Users.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task Insert(User newUser)
        {
            try
            {
                await _dbContext.Users.AddAsync(newUser);
                await _dbContext.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> Delete(int id)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
                if (user == null)
                {
                    return null;
                }
                _dbContext.Users.Remove(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> Update(int id, User updatedUser)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
                if (user == null)
                {
                    return null;
                }
                user.Address = updatedUser.Address;
                user.Parcels = updatedUser.Parcels;

                _dbContext.Users.Update(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch
            {
                throw;
            }
        }
    }
}
