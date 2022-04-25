using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataAccess
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _dbContext;

        public UserService(DatabaseContext dbContext)
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
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.Address = updatedUser.Address;
                user.LastName = updatedUser.LastName;
                user.PhoneNumber = updatedUser.PhoneNumber;
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
