using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomModel
{
    public class ProductBindingModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public int? BrandId { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string CoverFileName { get; set; }
    }
}
