import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isloading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
