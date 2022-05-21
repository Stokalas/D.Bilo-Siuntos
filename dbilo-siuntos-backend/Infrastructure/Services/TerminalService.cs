using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class TerminalService : ITerminalService
    {
        private readonly DatabaseContext _dbContext;

        public TerminalService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Terminal> GetById(int id)
        {
            try
            {
                var terminal = await _dbContext.Terminals.Include(a => a.Address).Include(p => p.Parcels).FirstOrDefaultAsync(x => x.Id == id);
                if (terminal == null)
                {
                    return null;
                }
                return terminal;
            }
            catch
            {
                //Log error
                throw;
            }
        }

        public async Task<IList<Terminal>> GetAll()
        {
            try
            {
                return await _dbContext.Terminals.Include(a => a.Address).Include(p => p.Parcels).ToListAsync();
            }
            catch
            {
                //Log error
                throw;
            }
        }
    }
}
