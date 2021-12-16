using DAL.Data.ScaffoldedEntities;
using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataAccess
{
    public class BrandDataAccessLayer
    {
        private readonly EcommercedbContext _db;
        public BrandDataAccessLayer(EcommercedbContext db)
        {
            this._db = db;
        }

        public List<Brand> GetAllBrands()
        {
            try
            {
                return _db.Brands.AsNoTracking().ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}
