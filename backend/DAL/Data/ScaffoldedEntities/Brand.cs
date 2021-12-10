using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Data.ScaffoldedEntities
{
    public partial class Brand
    {
        public Brand()
        {
            Products = new HashSet<Product>();
        }

        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string BrandName { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
