using BL.IBusinessLogics;
using DAL.Data.ScaffoldedEntities;
using DAL.DataAccess;
using CustomModel;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Entity;

namespace BL.BusinessLogics
{
    public class ProductBL: IProductBL
    {
        private readonly ProductDataAccessLayer _productDAL;
        public ProductBL(ProductDataAccessLayer productDAL)
        {
            this._productDAL = productDAL;
        }

        
        public List<Category> GetAllCategories()
        {
            var categories = _productDAL.GetAllCategories();

            return categories;
        }

        public List<Product> GetAllProducts()
        {
            var products = _productDAL.GetAllProducts();
            return products;
        }

        public bool AddCategory(AddCategoryBindingModel model)
        {
            if(model != null)
            {
                var category = new Category
                {
                    CategoryName = model.Name
                };
                var result = _productDAL.AddCategory(category);
                return result;
            }
            else
            {
                return false;
            }
        }

        public bool AddProduct(ProductBindingModel product)
        {
            var prodmodel = ConvertBindingModelToModel(product);
            try
            {
               var result = _productDAL.AddProduct(prodmodel);
                return result;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<ProductListBindingModel> getProductList(string? sentence, int? pageIndex, int? pageSize)
        {
            List<uspGetProductListResult> products = _productDAL.getProductsList(sentence, pageIndex, pageSize).ToList();

            List<ProductListBindingModel> product = new List<ProductListBindingModel>();

            for(int i = 0; i < products.Count; i++)
            {
                ProductListBindingModel productList = new ProductListBindingModel()
                {
                    ProductId = products[i].ProductID,
                    ProductName = products[i].ProductName,
                    Category = products[i].Category,
                    Price = products[i].Price,
                    Description = products[i].Description,
                    BrandId = products[i].BrandID,
                    TotalCount = products[i].TotalCount
                };
                product.Add(productList);
            }
            return product;
        }
            
        public Product ConvertBindingModelToModel(ProductBindingModel bm)
        {
            return new Product()
            {
                ProductId = bm.ProductId,
                ProductName = bm.ProductName,
                Description = bm.Description,
                BrandId = bm.BrandId,
                Category = bm.Category,
                Price = bm.Price,
                CoverFileName = bm.CoverFileName
            };
        }
    }
}
