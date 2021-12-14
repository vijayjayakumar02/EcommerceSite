import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public products: product[];
  searchControl = new FormControl();
  filteredProducts: Observable<product[]>;

  constructor(
    private productService: ProductService,
    private router:Router,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.loadProductData();
    this.setSearchControlValue();
    this.filterProductData();
  }

  searchStore(event){
    const searchItem = this.searchControl.value;
    if(searchItem !== ''){
      this.router.navigate(['/search'],{
        queryParams: {
          item: searchItem.toLowerCase()
        }
      });
    }
  }
  cancelSearch(){
    this.router.navigate(['/home']);
  }

  private loadProductData() {
    this.productService.products.subscribe(
      (data: product[]) => {
        this.products = data;
      }
    );
  }

  private setSearchControlValue() {
    this.subscriptionService.searchItemValue.subscribe(
      data => {
        if (data) {
          this.searchControl.setValue(data);
        } else {
          this.searchControl.setValue('');
        }
      }
    );
  }

  private filterProductData() {
    this.filteredProducts = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.products?.filter(option => option.productName.toLowerCase().includes(filterValue)
      || option.category.toLowerCase().includes(filterValue));
  }
}
