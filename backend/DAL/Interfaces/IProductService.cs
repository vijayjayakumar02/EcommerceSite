using DAL.Data.ScaffoldedEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IProductService
    {
        List<Category> GetAllCategories();
        bool AddProduct(Product product);
    }
}
