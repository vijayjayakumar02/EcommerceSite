import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ngmaterial.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavlistComponent } from './components/navlist/navlist.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductCardComponent,
    NavBarComponent,
    LoginComponent,
    UserRegistrationComponent,
    SidenavComponent,
    NavlistComponent,
    SearchComponent,
    HomeComponent,
    PageNotFoundComponent,
    PriceFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
