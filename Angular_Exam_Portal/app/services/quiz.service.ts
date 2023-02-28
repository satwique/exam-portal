import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseurl}/quiz/`)
  }
  public addQuiz(quiz:any){
    return this.http.post(`${baseurl}/quiz/`,quiz);

  }
  public deleteQuiz(qid:any){
    return this.http.delete(`${baseurl}/quiz/${qid}`);
  }
  public getQuiz(qid:any){
    return this.http.get(`${baseurl}/quiz/${qid}`);
  }

  public updateQuiz(quiz: any){
    return this.http.put(`${baseurl}/quiz/`,quiz);
  }

  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${baseurl}/quiz/category/${cid}`);
  }
  //get active quizzess
  public getActiveQuizzess(){
    return this.http.get(`${baseurl}/quiz/active`);
  }

  //get active quizzess of category
  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${baseurl}/quiz/category/active/${cid}`);
  }
}
