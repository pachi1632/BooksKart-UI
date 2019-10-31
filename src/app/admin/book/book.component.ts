import { Author } from './../author';
import { DropDownList } from './../../drop-down-list';
import { FormGroup, FormControl } from '@angular/forms';
import { Books } from './../books';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book';
import { AuthorBook } from '../author-book';
import { CustomerBook } from '../customer-book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  dropdownList: { "id": number; "itemName": string; }[]=[];
  selectedItems: { "id": number; "itemName": string; }[]=[];
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  authors: Author[]=[];
  authorBook=new AuthorBook;
  prevAuthID:number;
  customerBooks:CustomerBook[]=[];
  copyBook(){
    // this.book.name=this.books.book[this.id-1].name;
    this.book=this.books[this.index];
    this.prevAuthID=parseInt(this.book.author.id);
    // console.log(this.book);
    // console.log(this.books[this.id-1].name);
  }
  createForm(): any {
    
    this.form=new FormGroup({
      id:new FormControl({value:this.books[this.index].id,disabled:true}),
      name:new FormControl(this.books[this.index].name),
      releasedOn:new FormControl(this.books[this.index].releasedOn),
      //authorId:new FormControl(this.books[this.index].author.name),
      selectedItems:new FormControl(),
    });
  }
  getService(): any {
    this.activeRoute.paramMap.subscribe((data:ParamMap)=>{
      this.bookId=parseInt(data.get('bookid'));
      console.log(this.bookId);
      let booksData=localStorage.getItem("books");
      for(let entry of JSON.parse(booksData)){
        this.books.push(entry);
      }
      this.getAuthorService();
      this.getDropdownList();
      this.index=this.findIndex(this.bookId);
      //this.copyBook();
      this.book=this.books[this.index];
      if(this.book.author){
        this.prevAuthID=parseInt(this.book.author.id);
      }
        this.createForm();
      // this.service.getBooks().subscribe((data:Book[])=>{
      //   this.books={...data};
      //   this.copyBook();
      //   this.createForm();
        
      // })
      
      console.log(data);
      console.log(this.bookId);
    })
  }
  getAuthorService(){
    if(localStorage.getItem('authors')!=null){
      let authors=localStorage.getItem('authors');
      for(let entry of JSON.parse(authors)){
        this.authors.push(entry);
      }
    }
  }
  getDropdownList(){
    let i=0;
    for(let entry of this.authors){
      let it:DropDownList=new DropDownList;
        it.id=JSON.parse(this.authors[i].id);
        it.itemName=this.authors[i].name;
        i++;
        console.log(it);
        this.dropdownList.push(it);
    }
  }
  bookId: number;
  books:Book[]=[];
  book:Book;
  form:FormGroup;
  imgurl:string;
  index:number;

  constructor(private activeRoute:ActivatedRoute,private service:BooksService,private navRouter:Router) {
    
   }

  ngOnInit() {
    if(localStorage.getItem('customerBooks')!=null){
      this.customerBooks=JSON.parse(localStorage.getItem('customerBooks'));
    }
    this.getService();  
    // this.dropdownList = [
    //   {"id":1,"itemName":"India"},
    //   {"id":2,"itemName":"Singapore"},
    //   {"id":3,"itemName":"Australia"},
    //   {"id":4,"itemName":"Canada"},
    //   {"id":5,"itemName":"South Korea"},
    //   {"id":6,"itemName":"Germany"},
    //   {"id":7,"itemName":"France"},
    //   {"id":8,"itemName":"Russia"},
    //   {"id":9,"itemName":"Italy"},
    //   {"id":10,"itemName":"Sweden"}
    // ];
this.selectedItems = [
        {"id":2,"itemName":"Singapore"},
        {"id":3,"itemName":"Australia"},
        {"id":4,"itemName":"Canada"},
        {"id":5,"itemName":"South Korea"}
    ];
this.dropdownSettings = { 
          singleSelection: true, 
          text:"Select Author",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };
  }
  get bookid(){
    return this.form.get('bookid');
  }

  get bookname(){
    return this.form.get('bookname');
  }
  get releasedon(){
    return this.form.get('releasedon');
  }
  get authorid(){
    return this.form.get('authorid');
  }

  findIndex(bookId){
      function findIdIndex(element:Book){
          return bookId===element.id;
      }
     return this.books.findIndex(findIdIndex);
  }

  editBook(form){
    console.log(form);
    this.getBook(form);   ///sets values to this.book
      // this.book=form.value;
      // this.book.id=this.bookId
      function findIdIndex(element){
        return form.id==element.id;
      }
      let index=this.books.findIndex(findIdIndex);
      let id=form.author[0].id;
      let authIndex=this.getAuthorIndex(id);
      if(!this.book.author){
        this.updateAuthor(authIndex);
      }
      else{
        let prevAuthIndex=this.getAuthorIndex(this.prevAuthID);
        let authBookIndex=this.findAuthBookIndex(this.bookId,prevAuthIndex);
        if(this.authors[prevAuthIndex]){
          this.authors[prevAuthIndex].bookslist.splice(authBookIndex,1);
        }
        this.updateAuthor(authIndex);
      }
      ////////////////////////Changing CustomerBooks
      console.log("customerbooks before",this.customerBooks);
      for(let customerBookIndex=this.customerBooks.length-1;customerBookIndex>=0;customerBookIndex--){
        if(this.customerBooks[customerBookIndex].book.id==this.bookId){
          this.customerBooks[customerBookIndex].book=this.book;
        }
      }
        console.log("customerbooks after",this.customerBooks);
      this.books.splice(index,1,this.book);
      console.log("In book component");
      console.log(this.books);
      localStorage.setItem("books",JSON.stringify(this.books));//should not be after update author it becomes circular
      
      localStorage.setItem("authors",JSON.stringify(this.authors));
      localStorage.setItem("customerBooks",JSON.stringify(this.customerBooks));
      this.service.postBooks(this.book);
      this.navRouter.navigate(['admin/books'])
  }
  findAuthBookIndex(bookId,authIndex){
    function findIdIndex(element:Book){
      return bookId==element.id;
  }
  if(this.authors[authIndex]){
    return this.authors[authIndex].bookslist.findIndex(findIdIndex);
    }
    else return null;
  }
  findAuthIndex(authId){
    function findIdIndex(element:Author){
      return authId==element.id;
  }
 return this.authors.findIndex(findIdIndex);
  }

  getBook(form){
      this.book.id=form.id;
      this.book.name=form.name;
      this.book.releasedOn=form.releasedon;
      let id=form.author[0].id;
      let index=this.getAuthorIndex(id);
      let author=this.authors[index] ;
      this.book.author=author;
      console.log("book",this.book);
  }
  getAuthorIndex(authorId){
    function findAuthorIndex(element){
      return element.id==authorId;
    }
    console.log("authors",this.authors);
    let index=this.authors.findIndex(findAuthorIndex);
    return index;
  }

  updateAuthor(authorIndex){
     console.log("authorbooklist",this.authors[authorIndex].bookslist);
     this.authorBook.id=this.book.id;
     this.authorBook.name=this.book.name;
     this.authorBook.releasedOn=this.book.releasedOn;
     if(!this.authors[authorIndex].bookslist){
      this.authors[authorIndex].bookslist=[];
     }
     this.authors[authorIndex].bookslist.push(this.authorBook);
      console.log("this authors",this.authors);
  }
  
  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}

}
