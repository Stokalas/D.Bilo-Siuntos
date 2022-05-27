using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DataMappers
{
    public interface IDataMapper<T>
    {
        Task<T> GetById(int id);
    }
}
