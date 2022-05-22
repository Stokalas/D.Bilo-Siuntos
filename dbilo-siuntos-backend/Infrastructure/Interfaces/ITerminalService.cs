using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface ITerminalService
    {
        public Task<IList<Terminal>> GetAll();
        public Task<Terminal> GetById(int id);
    }
}
