import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  public getQuestionOfQuiz(qid:any){
    return this.http.get(`${baseurl}/question/quiz/all/${qid}`);
  }

  public addQuestion(question:any){
    return this.http.post(`${baseurl}/question/`,question);
  }

  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseurl}/question/${questionId}`);
  }
  public getQuestionOfQuizForTest(qid:any){
    return this.http.get(`${baseurl}/question/quiz/${qid}`);
  }

  public evalQuiz(questions:any){
    return this.http.post(`${baseurl}/question/eval-quiz`,questions)
  }

}
