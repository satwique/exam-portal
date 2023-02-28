import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category={
    title:'',
    description:'',
  }
  constructor(private c:CategoryService,private snack:MatSnackBar ) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }
  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open("Title Required !!",'',{duration:3000,})
      return ;
    }
    this.c.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!",'Category Added Successfully','success');
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error !!','error');

      }
    )
  }

}
