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

  filterProductData(){
    if(this.category){
      this.products = this.filterproduct.filter(p => p.category.toLowerCase() === this.category.toLowerCase());
    }
    else if(this.searchItem){
      this.products = this.filterproduct.filter(p => p.productName.toLowerCase().indexOf(this.searchItem) !== -1
      || p.productName.toLowerCase().indexOf(this.searchItem)!=-1);
    }
    else{
      this.products = this.filterproduct;
    }
    this.isloading = false;
  }
  
  ngOnDestroy(){
    this.subscriptionService.searchItemValue.next('');
  }
}
