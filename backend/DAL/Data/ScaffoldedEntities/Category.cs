using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Data.ScaffoldedEntities
{
    public partial class Category
    {
        public Category()
        {
            Brands = new HashSet<Brand>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Brand> Brands { get; set; }
    }
}
