import { Component, OnInit } from '@angular/core';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { /* TODO document why this constructor is empty */  }
  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',


  };

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }
  formSubmit(){
    
    if(this.user.userName=='' || this.user.userName==null){
      this.snack.open("UserName is required!!",'',{duration:3000});
    }
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          console.log(data);
          Swal.fire('Successfully done','User id:'+data.id,'success')

        },
        (error)=>{
          console.log(error);
         this.snack.open("something went wrong",'',{duration:2000})

        }
      )
  }

}
