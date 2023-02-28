import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  l:any;
  constructor(private loactaionst:LocationStrategy,private router:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBack();
    this.qid=this.router.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestion();
  }
  loadQuestion() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data:any)=>{
      this.questions=data;
      this.timer=this.questions.length*2*60;

      
      console.log(this.questions);
      this.startTimer();
    },
    (error:any)=>{
      console.log(error);
      Swal.fire('Error','Error in loading question of quiz','error');
    })
  }

  preventBack(){
    history.pushState(null,"null",location.href);
    this.loactaionst.onPopState(()=>{
      history.pushState(null,"null",location.href);
    })
  }
  submitQuiz(){
    Swal.fire({
      title:'Do you want to Submit the quiz?',
      
      showCancelButton:true,
      confirmButtonText:`Submit`,
      
      icon:'info', 
      }).then((e)=>{
        if(e.isConfirmed){
         this.evalquiz()

        }
       
      })
      

  }
  startTimer(){
   let t= window.setInterval(()=>{

      if(this.timer<=0){
        this.evalquiz();
        clearInterval(t);
      }
      else {
        this.timer--;
      }
    },1000)
  }
  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-(mm*60);
    return `${mm} min: ${ss} sec`;
  }
  evalquiz(){
    /*this.isSubmit=true;
    this.questions.forEach((q:any)=>{
      if(q.givenAnswer==q.answer){
        this.correctAnswer++;
        let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
        this.l=this.questions.length*2*60;
        this.marksGot+=marksSingle;
      }
      if(q.givenAnswer.trim()!=''){
        this.attempted++;

      }
    })*/

    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer=data.correctAnswers;
      this.attempted=data.attempted
      this.isSubmit=true;
      console.log(this.correctAnswer);
      console.log(this.marksGot);
      console.log(this.attempted)
    },
    (error:any)=>
    {
    console.log(error);
    }
    )
  }
  printPage(){
    window.print();
  }

}
