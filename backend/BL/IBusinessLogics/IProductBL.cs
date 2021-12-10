using CustomModel;
using DAL.Data.ScaffoldedEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.IBusinessLogics
{
    public interface IProductBL
    {
        List<Category> GetAllCategories();
        bool AddCategory(AddCategoryBindingModel model);
        bool AddProduct(ProductBindingModel product);
        List<Product> GetAllProducts();
    }
}
