import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    }
  }
  categories=[
    {
      cid:23,
      title:'programming',
      description:''
    }
   
  ]
  constructor(private category:CategoryService,private snack:MatSnackBar,private quiz:QuizService) { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
    this.category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>
      {
        console.log(error);
        Swal.fire('Error!!','error in loading data from server','error')
      }

    )
  
  }
  addQuiz(){
  if(this.quizData.title.trim()==''||this.quizData.title==null){
    this.snack.open("Title Required !!",'',{duration:3000,
    });
    return;

  }

  this.quiz.addQuiz(this.quizData).subscribe(
    (data:any)=>{
      Swal.fire('Success','quiz is added','success');
      this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
          cid:'',
        }
      }
    },
    (error:any)=>{
      Swal.fire('Error!!','Error while adding quiz','error');
      console.log(error);
      
    }
  )
  }


}
