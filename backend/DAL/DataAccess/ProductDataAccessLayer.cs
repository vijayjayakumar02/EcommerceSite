using DAL.Data.Context;
using DAL.Data.ScaffoldedEntities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataAccess
{
    public class ProductDataAccessLayer: IProductService
    {
        private readonly ECommerceDBContext _db;
        public ProductDataAccessLayer(ECommerceDBContext db)
        {
            this._db = db;
        }

        public List<Category> GetAllCategories()
        {
            try
            {
                return _db.Categories.AsNoTracking().ToList();
            }
            catch
            {
                throw;
            }
        }

        public List<Product> GetAllProducts()
        {
            try
            {
                return _db.Products.AsNoTracking().ToList();
            }
            catch
            {
                throw;
            }
        }

        public bool AddCategory(Category category)
        {
            try
            {
                _db.Categories.Add(category);
                _db.SaveChanges();

                return true;
            }
            catch
            {
                throw;
            }
        }

        public bool AddProduct(Product product)
        {
            try
            {
                _db.Products.Add(product);
                _db.SaveChanges();

                return true;
            }
            catch
            {
                throw;
            }
        }
    }
}
