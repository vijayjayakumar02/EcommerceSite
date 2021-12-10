using DAL.Data.ScaffoldedEntities;
using DAL.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.BusinessLogics
{
    public class BrandBL
    {
        private readonly BrandDataAccessLayer _brandDAL;
        public BrandBL(BrandDataAccessLayer brandDAL)
        {
            this._brandDAL = brandDAL;
        }
        public List<Brand> GetAllBrands()
        {
            var brands = _brandDAL.GetAllBrands();

            return brands;
        }
    }
}
