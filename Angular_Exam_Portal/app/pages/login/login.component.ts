import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router, Routes } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData={
    userName:'',
    password:'',
  }
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }
  formSubmit(){
    console.log("login button clicked");
    if(this.loginData.userName.trim()==''||this.loginData.userName==null){
      this.snack.open("username is requied",'',{duration:3000});
      return;

    }

    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open("password is requied",'',{duration:3000});
      return;

    }
    //reuqest server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success")
      console.log(data)
      //login..
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(
        (user:any)=>{
          this.login.setUser(user);
          console.log(user);
          console.log(this.login.getUserRole());
          //redirect
          if(this.login.getUserRole()=="ADMIN"){
              this.router.navigate(['/admin'])
              this.login.loginStatusSubject.next(true);
          }
          else if(this.login.getUserRole()=="NORMAL"){
            this.router.navigate(['/user-dashboard/0'])
            this.login.loginStatusSubject.next(true);
            
          }
          else{
              this.login.logOut();
              
          }
        }
      )
    },
    (error:any)=>{
      console.log("error");
      console.log(error);
      this.snack.open("invalid details!!Try Again",'',{duration:3000})
    }
    );
    
  }

}
