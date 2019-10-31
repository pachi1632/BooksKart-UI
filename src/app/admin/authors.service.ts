
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authors } from './authors';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http:HttpClient) { }
  getAuthors(){
    return this.http.get<Author[]>("assets/authors.json");
  }
  postAuthor(author){
    console.log("In author service");
    console.log(author);
    return this.http.post("assets/authors.json",author);
  }
}
