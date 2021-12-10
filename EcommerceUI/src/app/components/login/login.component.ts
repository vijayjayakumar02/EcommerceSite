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

  public loginForm=this.formBuilder.group({
    email:['',[Validators.email,Validators.required]],
    password:['',Validators.required]
  })

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
          () => {
            this.router.navigate(["home"]);
            localStorage.setItem('access',email);
            console.log("Success");
          },
          () => {
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
