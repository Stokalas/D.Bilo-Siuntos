using Infrastructure.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.DataMappers
{
    public class TerminalDataMapper : IDataMapper<Terminal>
    {
        private readonly string _connectionString;

        public TerminalDataMapper(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<Terminal> GetById(int id)
        {
            using SqlConnection connection = new(_connectionString);

            await connection.OpenAsync();

            SqlCommand command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM Terminals t INNER JOIN Addresses a ON a.Id = t.AddressId WHERE t.Id = @id";
            command.Parameters.AddWithValue("id", id);

            var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Terminal
                {
                    Id = id,
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Address = new Address
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("AddressId")),
                        City = reader.GetString(reader.GetOrdinal("City")),
                        AddressLine1 = reader.GetString(reader.GetOrdinal("AddressLine1")),
                        AddressLine2 = reader.GetString(reader.GetOrdinal("AddressLine2")),
                        PostalCode = reader.GetString(reader.GetOrdinal("PostalCode")),
                        Country = reader.GetString(reader.GetOrdinal("Country")),
                        Latitude = reader.GetDouble(reader.GetOrdinal("Latitude")),
                        Longitude = reader.GetDouble(reader.GetOrdinal("Longitude"))
                    }
                };

            }
            else
            {
                return null;
            }
        }
    }
}
