import { Injectable } from '@angular/core';

import { Books } from './books';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  getBooks(){
    return this.http.get<Book[]>('assets/books.json');
  }
  postBooks(book:Book){
    console.log("In post service");
    console.log(book);
    return this.http.post<Book>('assets/books.json',book);
  }
}
