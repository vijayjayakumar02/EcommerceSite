import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get isUserLoggedIn(){
    const user = localStorage.getItem('access');
    return user && user.length > 0;
  }
  onLogout(){
    localStorage.removeItem('access');  
  }

}
