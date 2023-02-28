import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid:any;
  quiz:any;
  
  constructor(private route:ActivatedRoute,private _quiz:QuizService,private router:Router) { }

  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.quiz=data;
    },(error:any)=>{
      console.log(error);
      alert("error in loading quiz data");

    })
  }
  startquiz(){
    Swal.fire({
      title:'Do you want to Start the quiz?',
      
      showCancelButton:true,
      confirmButtonText:`Start`,
      denyButtonText:`Don't start `,
      icon:'info', 
      }).then((result)=>{
        if(result.isConfirmed){
          this.router.navigate(['/start/'+this.qid]);
        }
        else if(result.isDenied){
          Swal.fire('Changes are not saved','','info')
        }
      })

  }

}
