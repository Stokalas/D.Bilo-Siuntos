using Infrastructure.Models;
using System.Linq.Expressions;

namespace Infrastructure.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetById(int id);
        public Task<User> GetSingle(Expression<Func<User, bool>> predicate);
        public Task<bool> isEmailUniq(string email);
        public Task<IList<User>> GetAll();
        public Task<User> Insert(User newUser);
        public Task<User> Delete(int id);
        public Task<User> Update(int id, User updatedUser, bool rewrite = false);
    }
}
