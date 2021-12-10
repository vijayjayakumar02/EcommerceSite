import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseURL:string="https://localhost:44302/api/Account/";
  constructor(private httpclient: HttpClient) { }

  public login(email:string, password:string)
  {
    const body={
      Email : email,
      Password : password
    }
    return this.httpclient.post<ResponseModel>(this.baseURL+"Login",body);
  }

  public Register(fullname:string,email:string, password:string)
  {
    const body={
      FullName:fullname,
      Email:email,
      Password:password
    }
    return this.httpclient.post<ResponseModel>(this.baseURL+"RegisterUser",body);
  }
}
