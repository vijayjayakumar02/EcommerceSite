import { Component, Input, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, takeUntil } from 'rxjs';
import { Categories } from 'src/app/models/categories';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {

  @Input()
  category: string;

  categoriesList: any[] = [];

  constructor(private productService: ProductService, private snackBarService: SnackbarService) { }
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(){
    this.productService.categories.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (categoryData: any) => {
        this.categoriesList = categoryData
      },error=>{
        console.log('Error ocurred while fetching category List : ', error);
      });
  }
}
