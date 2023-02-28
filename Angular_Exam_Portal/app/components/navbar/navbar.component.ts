import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  user=null;
  
  constructor(public login:LoginService,private router:Router) { }
  
  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
   
    
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    })
    
    
  
  }
  logout(){
    this.login.logOut();
    window.location.reload();
  }
  login1(){
    this.router.navigate(['login']);
    
    
   

    

  }

}
