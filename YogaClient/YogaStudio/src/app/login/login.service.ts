import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginSuccessModel} from '../Models/LoginSuccessModel';
import {LoginDto} from '../Models/LoginDto';
import {RegisterDto} from '../Models/RegisterDto';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl= 'api/login/';
  loginSuccessSource= new BehaviorSubject<LoginSuccessModel>(null);
  loginSuceess$= this.loginSuccessSource.asObservable();

  constructor( private http: HttpClient) { }

  login(loginInfo:LoginDto){
    return this.http.post(this.baseUrl,loginInfo).pipe(
      map((res:LoginSuccessModel)=>{
        console.log("loginSuccess",res)
        this.setSourceAndToken(res);
      }));
  }

  logout(){
      this.loginSuccessSource.next(null);
      localStorage.removeItem('token');
  }

  getCurrentUser(token){
    let headers= new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+token);
    return this.http.get(this.baseUrl+'current',{headers}).pipe(
      map((res:LoginSuccessModel)=>{
        console.log("loginSuccess",res)
        this.setSourceAndToken(res);
      }));
  }

  register(registerInfo){
    return this.http.post(this.baseUrl+'register', registerInfo).pipe(
      map((res:LoginSuccessModel)=>{
        console.log('after register', res);
        this.setSourceAndToken(res);
      })
    )
}

  private setSourceAndToken(res:LoginSuccessModel){
    this.loginSuccessSource.next(res);
    localStorage.setItem('token',res.token);
}




}
