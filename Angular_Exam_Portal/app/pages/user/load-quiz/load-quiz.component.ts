import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute,private _quiz:QuizService) { }
  cid:any;
  quizzess:any;

  ngOnInit(): void {
   
    this.route.params.subscribe((params)=>{
      this.cid=params['cid'];
      if(this.cid==0){
        console.log("load all quiz");
        this._quiz.getActiveQuizzess().subscribe((data:any)=>{
          this.quizzess=data;
          console.log(this.quizzess);
        },
        (error:any)=>{
          console.log(error);
          alert("error");
        })
      }
      else{
        console.log("load specific quiz");
        this._quiz.getActiveQuizzesOfCategory(this.cid).subscribe((data:any)=>{
          this.quizzess=data;
        },
        (error:any)=>{
          console.log("error in loading quiz data");
          alert("error in loading quiz")

        })
      }
    })
    
  }

}
