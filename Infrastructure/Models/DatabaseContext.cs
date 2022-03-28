using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    internal class DatabaseContext : DbContext
    {
        public DbSet<Parcel> Parcels { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base (options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured == false)
            {
                var connectionString = "Server=(localdb)\\MSSQLLocalDB; Database=LibraryDb; Integrated Security=True;";

                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }
}
