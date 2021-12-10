import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public RegisterForm=this.formBuilder.group({
    fullname:['',Validators.required],
    email:['',[Validators.email,Validators.required]],
    password:['',Validators.required]
  })

  constructor(private router:Router,private formBuilder: FormBuilder,private userService:UserService,private snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("submit");
    let fullname = this.RegisterForm.controls["fullname"].value;
    let email = this.RegisterForm.controls["email"].value;
    let password = this.RegisterForm.controls["password"].value;
    this.userService.Register(fullname,email,password).subscribe(
      ()=>{
        console.log("success")
        this.router.navigate(['']);
      },error=>{
        console.log("error",error);
        this.snackBarService.showSnackBar('Error Occured try again!');
      }
    )
  }

}
