import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categories } from '../models/categories';
import { map, shareReplay } from 'rxjs';
import { product } from '../models/product';
import { productList } from '../models/productList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = "https://localhost:44302/api/Product/";
  constructor(private http: HttpClient) { }

  categories = this.http.get<Categories[]>(this.baseURL+ 'GetAllCategories').pipe(shareReplay(1));

  products = this.getAllProducts().pipe(shareReplay(1));

  getAllProducts(){
    return this.http.get<product[]>(this.baseURL+'GetAllProducts')
  }

  addProduct(product:any){
    return this.http.post(this.baseURL+'Addproduct', product);
  }

  getProductById(id: number) {
    return this.products.pipe(map(prod => prod.find(p => p.productId === id)));
  }

  getProductList(sentence:string|"", pageIndex:number|0, pageSize:number|0){
    return this.http.get<productList[]>(this.baseURL+'GetProductList/'+`?sentence=${sentence}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }
}

