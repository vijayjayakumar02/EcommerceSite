using BL.BusinessLogics;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Enums;

using WebAPI.Models.DTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using CustomModel;
using BL.IBusinessLogics;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductController: Controller
    {
        private readonly IProductBL _productBL;
        private readonly BrandBL _brandBL;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly string coverImageFolderPath = string.Empty;
        private readonly IConfiguration _config;
        public ProductController(ProductBL productBL,BrandBL brandBL ,IConfiguration config, IWebHostEnvironment hostingEnvironment)
        {
            this._productBL = productBL;
            this._brandBL = brandBL;
            this._config = config;
            this._hostingEnvironment = hostingEnvironment;
            coverImageFolderPath = Path.Combine(_hostingEnvironment.WebRootPath, "Upload");
            if (!Directory.Exists(coverImageFolderPath))
            {
                Directory.CreateDirectory(coverImageFolderPath);
            }
        }


        [HttpPost("Addproduct"), DisableRequestSizeLimit]
        public async Task<Object> AddProducts() 
        {
            ProductBindingModel product = JsonConvert.DeserializeObject<ProductBindingModel>(Request.Form["ProductFormData"].ToString());

            if(Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {
                    string fileName = Guid.NewGuid() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(coverImageFolderPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    product.CoverFileName = fileName;
                }
            }
            else
            {
                product.CoverFileName = _config["DefaultCoverImageFile"];
            }

            try
            {
                var result = _productBL.AddProduct(product);

                if (result == true)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "product added succesfully", product));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Failed", null));
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet("GetAllProducts")]
        public async Task<Object> GetAllProducts()
        {
            try
            {
                var result = _productBL.GetAllProducts();
                if (result != null)
                {
                    return await Task.FromResult(result);
                }
                return await Task.FromResult("Empty");
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet("GetProductList")]
        public IActionResult GetProductsList(string? sentence, int? pageIndex = 0, int? pageSize = 5)
        {
            if(pageSize == 0)
            {
                IEnumerable<ProductListBindingModel> getProductDetails1 = _productBL.getProductList(sentence, pageIndex, pageSize + 5);
                return Ok(getProductDetails1);
            }
            else
            {
                IEnumerable<ProductListBindingModel> getProductsDetails2 = _productBL.getProductList(sentence, pageIndex, pageSize);
                return Ok(getProductsDetails2);
            }
        }

        [HttpPost("AddCategory")]
        public async Task<Object> AddCategory(AddCategoryBindingModel model)
        {
            try
            {
                var result = _productBL.AddCategory(model);
                if (result == true)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "category added succesfully", model));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Failed", null));
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet("GetAllCategories")]
        public async Task<Object> CategoryDetails()
        {
            try
            {
                var result = _productBL.GetAllCategories();
                if(result != null)
                {
                    return await Task.FromResult(result);
                }
                return await Task.FromResult("Empty");
            }
            catch(Exception e)
            {
                return e.Message;
            }

        }

        [HttpGet("GetAllBrands")]
        public async Task<Object> getAllBrands()
        {
            try
            {
                var result = _brandBL.GetAllBrands();
                if (result != null)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Fetched succesfully", result));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Empty", null));
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }

    }
    
}
