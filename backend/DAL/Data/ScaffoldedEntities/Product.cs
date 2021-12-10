using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Data.ScaffoldedEntities
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public int? BrandId { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string CoverFileName { get; set; }

        public virtual Brand Brand { get; set; }
    }
}
