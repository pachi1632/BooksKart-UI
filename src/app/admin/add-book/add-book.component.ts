import { Author } from './../author';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from './../book';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private service:BooksService,private navRouter:Router,private activeRouter:ActivatedRoute) { }

  form:FormGroup;
  book:Book;
  books:Book[];
  bookId:number;
  authors:Author[]=[];

  ngOnInit() {
    this.getAuthors();
    this.activeRouter.paramMap.subscribe((data:ParamMap)=>{
      this.bookId=parseInt(data.get('bookid'));
      console.log(this.bookId);
    })
    this.form=new FormGroup({
      id:new FormControl({value:this.bookId,disabled:true},Validators.required),
      name:new FormControl("",Validators.required),
      releasedOn:new FormControl("",Validators.required),
      // authorId:new FormControl("",Validators.required),
    })
  }
  onSubmit(form){
      this.book=form.value;
      this.books=[];
      this.book.id=this.bookId;
      this.service.postBooks(this.book);
      if(localStorage.getItem('books')!=null){
        let booksData=localStorage.getItem("books");
        for(let entry of JSON.parse(booksData)){
          this.books.push(entry);
        }
      }
      this.books.push(this.book);
      localStorage.setItem("books",JSON.stringify(this.books));
      console.log(this.books);
      this.navRouter.navigate(['admin/books']);
  }

  updateAuthorField(){

  }
  findAuthorIndex(authorId){
    
  }
  getAuthors(){
    if(localStorage.getItem("authors")!=null){
      let authorData=localStorage.getItem("authors");
      for(let entry of JSON.parse(authorData)){
        this.authors.push(entry);
      }
    }
  }

}
