import { Book } from './../book';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { Authors } from '../authors';
import { Author } from '../author';
import { element } from 'protractor';
import { CustomerBook } from '../customer-book';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  customerBooks: CustomerBook[]=[];

  constructor(private service:AuthorsService,private router:Router) { }

  authors:Author[];
  books:Book[]=[];

  ngOnInit() {
    this.authors=[];
    if(localStorage.getItem("authors")!=null){
      let authorData=localStorage.getItem("authors");
      for(let entry of JSON.parse(authorData)){
        this.authors.push(entry);
      }
      console.log("this authors",this.authors);    
    }
    if(localStorage.getItem("books")!=null){
      let booksData=localStorage.getItem("books");
      for(let entry of JSON.parse(booksData)){
        this.books.push(entry);
      }
      console.log("this books",this.books);    
    }
    if(localStorage.getItem("customerBooks")!=null){
      let customerBookData=localStorage.getItem("customerBooks");
      for(let entry of JSON.parse(customerBookData)){
        this.customerBooks.push(entry);
      }
      console.log("this customerBooks",this.customerBooks);    
    }
    // ////*****IMP Don't delete */
    // this.service.getAuthors().subscribe((data:Author[])=>{
    //   for (let entry of data) {
    //     this.authors.push(entry);
    //   }
    //     //this.authors={...data};
    //     localStorage.setItem('authors',JSON.stringify(this.authors));
    //     // let item=JSON.parse(localStorage.getItem('name'));
    //     // console.log("This is item");
    //     // console.log(item);
    // })
  }
  onClick(author:Author){
    console.log(author);
    this.router.navigate(['admin/author',author.id])
  }
  addAuthor(){
    if(this.authors.length!=0){
      let index=this.authors.length-1;
    let id=parseInt(this.authors[index].id)+1;
    this.router.navigate(['admin/addAuthor',id]);
    }
    else{
      this.router.navigate(['admin/addAuthor',1]);
    }
    
  }
  onDelete(author:Author){
    function findIdIndex(element){
      return author.id===element.id;
    }
    if(confirm("Do you want to Delete??")){
      let id=this.authors.findIndex(findIdIndex);
      this.authors.splice(id,1);

      for(let bookIndex=this.books.length-1;bookIndex>=0;bookIndex--){
        if(parseInt(this.books[bookIndex].author.id)==parseInt(author.id)){
            for(let customerBookIndex=this.customerBooks.length-1;customerBookIndex>=0;customerBookIndex--){
              if(this.customerBooks[customerBookIndex].book.id==this.books[bookIndex].id){
                this.customerBooks.splice(customerBookIndex,1);
              }
            }
            this.books.splice(bookIndex,1);
        }
      }
      // for(let book of this.books){
      //   if(book.author.id==author.id){    ////updating books entity
      //     let bookIndex=this.findBookIndex(book.id);
      //     this.books.splice(bookIndex,1);
      //     for(let customerBook of this.customerBooks){
      //       if(book.id==customerBook.book.id){ ///updating customer books entity
      //         let customerBookIndex=this.findCustomerBookIndex(customerBook.id)
      //         this.customerBooks.splice(customerBookIndex,1);
      //       }
      //     }
      //   }
      // }

      console.log("this authors",this.authors);
      console.log("this books",this.books);
      console.log("this customerBooks",this.customerBooks);
      localStorage.setItem("authors",JSON.stringify(this.authors));
      localStorage.setItem("books",JSON.stringify(this.books))
      localStorage.setItem("customerBooks",JSON.stringify(this.customerBooks))
    }
  }
  findCustomerBookIndex(customerBookId){
    function findBookIdIndex(element:CustomerBook){
      return customerBookId==element.id;
    }
    let index=this.customerBooks.findIndex(findBookIdIndex);
    return index;
  }
  findBookIndex(bookId){
      function findBookIdIndex(element:Book){
        return bookId==element.id;
      }
      let index=this.books.findIndex(findBookIdIndex);
      return index;
  }

}
