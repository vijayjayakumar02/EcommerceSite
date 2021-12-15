import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: product[];
  public filterproduct: product[];
  category: string;
  priceRange = Number.MAX_SAFE_INTEGER;
  searchItem: string;
  isloading: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.isloading = true;
    this.getAllProductData();
  }

  getAllProductData(){
    this.productService.products.pipe(switchMap(
      (data: product[]) => {
        this.filterproduct = data;
        return this.route.queryParams;
      }
    )).subscribe(params => {
      this.category = params['category'];
      this.searchItem = params['item'];
      this.subscriptionService.searchItemValue.next(this.searchItem);
      this.filterProductData();
    })
  }
  filterPrice(value: number){
    this.priceRange = value;
    this.filterProductData();
  }

  filterProductData(){

    const filteredData = this.filterproduct.filter(p => p.price <= this.priceRange).slice();

    if(this.category){
      this.products = filteredData.filter(p => p.category.toLowerCase() === this.category.toLowerCase());
    }
    else if(this.searchItem){
      this.products = filteredData.filter(p => p.productName.toLowerCase().indexOf(this.searchItem) !== -1
      || p.productName.toLowerCase().indexOf(this.searchItem)!=-1);
    }
    else{
      this.products = filteredData;
    }
    this.isloading = false;
  }
  
  ngOnDestroy(){
    this.subscriptionService.searchItemValue.next('');
  }
}
