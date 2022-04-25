using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IUser
    {
        public Task<User> GetById(int id);
        public Task<IList<User>> GetAll();
        public Task Insert(User newUser);
        public Task Delete(int id);
        public Task Update(int id, User updatedUser);
    }
}
