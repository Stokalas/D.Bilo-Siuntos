using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base (options) { }
        public DbSet<Parcel>? Parcels { get; set; }
        public DbSet<User>? Users { get; set; }
    }
}
