import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  @Input()
  product!: product;

  productList: any[] = [];

  isActive = false;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(){
    this.productService.getAllProducts().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (ProductData: any) => {
        this.productList = ProductData;
      },error=>{
        console.log('Error ocurred while fetching category List : ', error);
    });
  }


}
