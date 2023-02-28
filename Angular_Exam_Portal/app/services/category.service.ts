import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public categories(){
    return this.http.get(`${baseurl}/category/`);
  }

  public addCategory(category: any){
    return this.http.post(`${baseurl}/category/`,category);
    
  }
}
