using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetById(int id);
        public Task<IList<User>> GetAll();
        public Task<User> Insert(User newUser);
        public Task<User> Delete(int id);
        public Task<User> Update(int id, User updatedUser);
    }
}
