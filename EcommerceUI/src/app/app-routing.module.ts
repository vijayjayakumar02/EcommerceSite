import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent, pathMatch:'full'},
  {path:'display',component:ProductCardComponent},
  {path:'register',component:UserRegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'filter',component:HomeComponent},
  {path:'search', component:HomeComponent},
  {path:'add-product',component:ProductFormComponent, canActivate:[AuthGuard]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
