import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { productList } from 'src/app/models/productList';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-records',
  templateUrl: './product-records.component.html',
  styleUrls: ['./product-records.component.css']
})
export class ProductRecordsComponent implements OnInit {

  productList: productList[] = [];

  dataSource = new MatTableDataSource<productList>();

  length = 0;
  pageSize = 0;
  pageSizeOptions = [];
  pageIndex = 0;

  displayedColumns: string[] = ['ProductId','ProductName','Description','Catagory','Price'];

  constructor(private productService: ProductService) { }

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngOnInit(): void {
    this.productService.getProductList('',0,0).subscribe(
      data => {
        this.productList = data;
        this.length = this.productList[0].totalCount;
        this.dataSource = new MatTableDataSource(this.productList);

        this.dataSource.sort = this.sort;
      }
    )
  }

  GetProductList(sentence: string | '', pageIndex: number | 0, pageSize: number | 0) {
    this.productService.getProductList(sentence, pageIndex, pageSize).subscribe(
      data => {
        this.productList = data;
        this.dataSource = new MatTableDataSource(this.productList);

        this.dataSource.sort = this.sort;
      }
    );
  }

}
