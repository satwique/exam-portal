import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }


  public getCurrentUser(){
    return this.http.get(`${baseurl}/current-user`);
  }
  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseurl}/generate-token`,loginData)
  }
  //loginuser
  public loginUser(token: any){
    localStorage.setItem('token',token)
    
    return true;
  }

  //islogin
  public isLoggedIn(){
    let token1=localStorage.getItem("token");
    if(token1==undefined||token1==''||token1==null){
      return false;
    }
    else{
      return true;
    }
  }

  //logout
  public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  //get token
 public getToken(){
  return localStorage.getItem('token');

 }
 
 //setuser
 public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));
 }

 //get user
 public getUser(){
  let user1=localStorage.getItem("user");
  if(user1!=null){
    return JSON.parse(user1);
  }
  else{
    this.logOut();
    return null;
  }
 }
 //get user role
 public getUserRole(){
  let user=this.getUser();
  return user.authorities[0].authority;
 }


}
