import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent implements OnInit {
  @Output()
  priceValue = new EventEmitter<number>(true);

  max: number;
  min: number;
  value: number;
  step = 100;
  thumbLabel = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.setPrice();
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  setPrice(){
    this.productService.products.pipe().subscribe(
      (data: product[]) => {
        this.setMinValue(data);
        this.setMaxValue(data);
      }
    );
  }
  setMinValue(product: product[]){
    this.min = product.reduce((prev,curr)=>{
      return prev.price < curr.price ? prev : curr;
    }).price;
  }
  setMaxValue(product: product[]){
    this.max = product.reduce((prev,curr)=>{
      return prev.price > curr.price ? prev : curr;
    }).price;
  }

  onChange(event){
    this.priceValue.emit(event.value);
  }
}
