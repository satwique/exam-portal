import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute,private quiz:QuizService,private category:CategoryService,private router:Router) { }
  qid1=0;
  quiz1:any;
  categories:any;
  ngOnInit(): void {
    this.qid1=this.route.snapshot.params['qid'];
    this.quiz.getQuiz(this.qid1).subscribe(
      (data:any)=>{
        this.quiz1=data;
        console.log(this.quiz1)
      },
      (error:any)=>{
        console.log(error);
      }
    );
    this.category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        alert("error in loading category");
      }
    )

  }
 public updateData(){
  this.quiz.updateQuiz(this.quiz1).subscribe((data:any)=>{
    Swal.fire("Success !!","Quiz Updated",'success').then((e)=>{
      this.router.navigate(['/admin/quizzes'])
    })
  },
  (error)=>{
    Swal.fire('Error!!','Error in updateing quiz','error');
    console.log(error);
  })
 }

}
