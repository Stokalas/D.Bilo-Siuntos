using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


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
                //Log error
                throw;
            }
        }


        public async Task<User> GetSingle(Expression<Func<User, bool>> predicate)
        {
            return await _dbContext.Set<User>().FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> isEmailUniq(string email)
        {
            var user = await this.GetSingle(u => u.Email == email);
            return user == null;
        }

        public async Task<IList<User>> GetAll()
        {
            try
            {
                return await _dbContext.Users.ToListAsync();
            }
            catch
            {
                //Log error
                throw;
            }
        }

        public async Task<User> Insert(User newUser)
        {
            try
            {
                await _dbContext.Users.AddAsync(newUser);
                await _dbContext.SaveChangesAsync();
                return newUser;
            }
            catch
            {
                //Log error
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
                //Log error
                throw;
            }
        }

        public async Task<User> Update(int id, User updatedUser, bool rewrite = false)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }
            user.Address = updatedUser.Address;
            user.Parcels = updatedUser.Parcels;

            _dbContext.Users.Update(user);
            try
            {
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (rewrite == true)
                {
                    foreach (var entry in ex.Entries)
                    {
                        if (entry.Entity is Parcel)
                        {
                            var proposedValues = entry.CurrentValues;
                            var databaseValues = entry.GetDatabaseValues();

                            foreach (var property in proposedValues.Properties)
                            {
                                var proposedValue = proposedValues[property];
                                var databaseValue = databaseValues[property];
                            }
                            entry.OriginalValues.SetValues(databaseValues);
                        }
                    }
                    await _dbContext.SaveChangesAsync();
                    return user;
                }
                else
                {
                    throw new Exception("User was not updated!");
                }
            }
        }
    }
}
