import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes=[
    {
      qid:23,
      title:'basic java',
      description:'core java quiz',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'programming'
      }

    }
  ]
  constructor(private q:QuizService) { }

  ngOnInit(): void {
    this.q.quizzes().subscribe(
      (data:any)=>
      {
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!',"Error in loading data!",'error')
      }
    )
  }
  deletequiz(qid:any){
    Swal.fire({
      icon:'info',
      title:'are you sure?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.q.deleteQuiz(qid).subscribe((data:any)=>{
          this.quizzes=  this.quizzes.filter((quiz)=>quiz.qid!=qid)
            Swal.fire('Success','quiz is deleted','success');
            console.log(data);
      
          },(error:any)=>{
            Swal.fire('Error!!','Error while deleting quiz','error');
          }
        );
        }
        
        
      
    });


}

}