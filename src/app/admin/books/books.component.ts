import { Author } from './../author';
import { element } from 'protractor';
import { Book } from './../book';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Books } from '../books';
import { CustomerBook } from '../customer-book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private service:BooksService,private router:Router) { }
  books:Book[];
  authors:Author[]=[];
  customerBooks:CustomerBook[]=[];
  ngOnInit() {
    this.books=[];
    if(localStorage.getItem('books')!=null){
      let booksData=localStorage.getItem('books');
      for(let entry of JSON.parse(booksData)){
        this.books.push(entry);
      }
      console.log(this.books);
    }
    if(localStorage.getItem('authors')){
      this.authors=JSON.parse(localStorage.getItem('authors'));
    }
    if(localStorage.getItem('customerBooks')){
      this.customerBooks=JSON.parse(localStorage.getItem('customerBooks'));
    }
     // // *****IMP Don't delete */
    // this.service.getBooks().subscribe((data:Book[])=>{
    //   for(let entry of data){
    //     this.books.push(entry);
    //   }
    //   //this.books={...data};
    //   localStorage.setItem('books',JSON.stringify(this.books));
    //   //console.log(data.book[2]);
    // })
    
  }
  onClick(book:Book){
    this.router.navigate(['admin/book',book.id]);
  }
  addBook(){
    if(this.books.length!=0){
        let index=this.books.length-1;
        let id=this.books[index].id+1;
        this.router.navigate(['admin/addBook',id])
    }
    else{
      this.router.navigate(['admin/addBook',1]);
    }   
  }
  onDelete(book){
    function findIdIndex(elememt:Book){
      return elememt.id===book.id;
    }
    if(confirm("Do you want to Delete??")){
      for(let entry of this.books){
        if(entry.id===book.id){
            let id= this.books.findIndex(findIdIndex);
            this.books.splice(id,1);
            console.log("onDelete");
            console.log(this.books);
            ///////Updating authors
            for(let authorIndex=this.authors.length-1;authorIndex>=0;authorIndex--){
              for(let bookIndex=this.authors[authorIndex].bookslist.length-1;bookIndex>=0;bookIndex--){
                if(this.authors[authorIndex].bookslist[bookIndex].id==book.id){
                  this.authors[authorIndex].bookslist.splice(bookIndex,1);
                }
              }
            }
            console.log("this authors",this.authors);
            ///////Updating customerBooks
            for(let customerBookIndex=this.customerBooks.length-1;customerBookIndex>=0;customerBookIndex--){
              if(this.customerBooks[customerBookIndex].book.id==book.id){
                this.customerBooks.splice(customerBookIndex,1);
              }
            }
            console.log("this customerBooks after",this.customerBooks);
      localStorage.setItem('customerBooks',JSON.stringify(this.customerBooks));
      localStorage.setItem('books',JSON.stringify(this.books));
      localStorage.setItem('authors',JSON.stringify(this.authors));
      this.ngOnInit();
        }
      }
    }
    
   
    
  }
  

}
