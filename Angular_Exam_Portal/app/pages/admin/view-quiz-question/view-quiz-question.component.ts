import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
qid: any;
qtitle:any;
questions=[{
  quesId:'',
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
  quiz:{
    qid:''
  }
}];
  constructor(private route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    this.qtitle=this.route.snapshot.params['title'];
    console.log(this.qid);
    console.log(this.qtitle);
    this._question.getQuestionOfQuiz(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.questions=data;
    },
    (error:any)=>{
      console.log(error);

    })
  }
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure,want to delete this question'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe((data:any)=>{
            this._snack.open('Question Deleted','',{
              duration:3000,
            });
            this.questions=this.questions.filter((q)=>q.quesId!=qid);
        },
        (error)=>{
          this._snack.open('Error in Deleting Question','',{
            duration:3000,
          });
          console.log(error);
        })
      }
    })

  }

}
