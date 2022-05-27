
namespace Infrastructure.DataMappers
{
    public interface IDataMapper<T>
    {
        Task<T> GetById(int id);
    }
}
