import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(private router:Router, private formBuilder: FormBuilder, private userService: UserService, private route:ActivatedRoute) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get email(){
    return this.loginForm.get('email');
  }


  ngOnInit(): void {
  }

  login(){
    console.log("login working");
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    if (this.loginForm.valid) {

      this.userService.login(email,password)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (data:any) => {
            if(data.responseCode == 1){
              this.router.navigate(["home"]);
              localStorage.setItem('access',JSON.stringify(data.dataSet));
              console.log("Success");
            }
          },
          () => {
            console.log(Error);
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
