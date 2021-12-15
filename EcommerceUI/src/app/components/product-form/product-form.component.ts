import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
//import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  private formData = new FormData();
  coverImagePath:any;
  files:any;
  productForm: FormGroup;
  categoryList: any[] = [];
  formTitle = 'Add';
  productId:any;


  private unsubscribe$ = new Subject<void>();

  constructor(private productService: ProductService,private route: ActivatedRoute, private fb: FormBuilder, private router: Router){ 
    this.productForm = this.fb.group({
      productId: 0,
      Productname: ['', Validators.required],
      Description: ['', Validators.required],
      Brand:[null,[Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }


  get Productname() {
    return this.productForm.get('Productname');
  }

  get Description() {
    return this.productForm.get('Description');
  }

  get Brand() {
    return this.productForm.get('Brand');
  }

  get Category(){
    return this.productForm.get('category');
  }

  get price() {
    return this.productForm.get('price');
  }

  ngOnInit() {
    this.productService.categories.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (categoryData: any) => {
        this.categoryList = categoryData
      },error=>{
        console.log('Error ocurred while fetching category List : ', error);
      });

      this.route.params.subscribe(
        params =>{
          if(params['id']){
            this.productId = +params['id'];
            this.fetchProductData();
          }
        }
      )
  }

  fetchProductData(){
    console.log(this.price);
    this.formTitle = 'Edit';
    this.productService.getProductById(this.productId).pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (result:any) => {
        this.setProductFormData(result);
      },error => {
        console.log('Error ocurred while fetching book data : ', error);
      }
    )
  }

  onFormSubmit(){
    console.log("submit")
    if(!this.productForm.valid){
      console.log('failed')
      return;
    }
    if(this.files && this.files.length > 0){
      for(let j=0;j<this.files.length; j++){
        this.formData.append('file'+ j, this.files[j]);
      }
    }
    this.formData.append('ProductFormData', JSON.stringify(this.productForm.value));
    this.saveproductDetails();
  }

  saveproductDetails(){
    console.log("saving..");
    this.productService.addProduct(this.formData).pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      () => {
        console.log("saved...")
        this.router.navigate(['home']);
      },
      error => {
        this.productForm.reset();
        console.log('Error ocurred while adding book data : ', error)
      });
  }

  cancel(){
    this.router.navigate(['/']);
  }

  setProductFormData(productFormData:product){
    this.productForm.setValue({
      productId: productFormData.productId,
      productName: productFormData.productName,
      description: productFormData.description,
      brand:productFormData.brand,
      category: productFormData.category,
      price: productFormData.price
    });
    this.coverImagePath = '/Upload/'+ productFormData.coverFileName;
  }

  uploadImage(event:any) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (myevent: ProgressEvent) => {
      this.coverImagePath = (myevent.target as FileReader).result;
    };
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
