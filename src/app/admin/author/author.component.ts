import { Author } from './../author';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { pipe } from '@angular/core/src/render3/pipe';
import { DropDownList } from '../../drop-down-list';
import { Book } from '../book';
import { CustomerBook } from '../customer-book';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  dropdownList: { "id": number; "itemName": string; }[]=[];
  selectedItems: { "id": number; "itemName": string; }[]=[];
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  books: Book[]=[];
  book: Book;
  bookIndex: (bookId: number) => number;

  constructor(private router:ActivatedRoute,private service:AuthorsService,private navRouter:Router) { }

  //authors:Author[]=[];
  form:FormGroup;
  authorId:number;
  imgurl:string;
  index:number;
  insertAuthor=new Author;
  author=new Author;
  authors:Author[]=[];
  


  ngOnInit() {
    this.router.paramMap.subscribe((data:ParamMap)=>{
      console.log(data.get('authorid'));
      this.authorId=parseInt(data.get('authorid'));
      //this.getService();

    //   this.dropdownList = [
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
  
];
this.dropdownSettings = { 
    singleSelection: false, 
    text:"Select Books",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class"
  };
      
    });
    this.getService();
  }

  addAuthers(form){
   let body = form;
   //this.author=form;
   console.log("FormData", form);
   console.log("this author", this.author);
   console.log("authors",this.authors);
  //  console.log("List", this.author.bookslist);
      console.log(form);
      this.author.id=JSON.stringify(this.authorId);
      this.service.postAuthor(this.author);
      // if(this.authors)
      this.getAuthor(form);
      console.log("author",this.author);
      this.index=this.findIndex(parseInt(this.author.id));
      this.authors.splice(this.index,1,this.author);
      console.log("In authors component");
      console.log("In author component");
      console.log(this.authors);
      console.log("before",this.books);
       console.log("after",this.books);
       for(let entry of form.bookslist){
         let bookIndex=this.findBookIdIndex(entry.id);
         console.log("bookindex",bookIndex);
        this.books[bookIndex].author=this.author;
       }
      localStorage.setItem('authors',JSON.stringify(this.authors));
      localStorage.setItem('books',JSON.stringify(this.books));
      
      this.navRouter.navigate(['admin/authors']);
       console.log("In author component");
      console.log(this.books)
  
      // localStorage.setItem('authors',JSON.stringify(this.author));
      // localStorage.setItem("item","ok");
      // let item=localStorage.getItem('authors');
      // console.log(item);
   
  }
  getAuthor(form){
      this.insertAuthor.id=JSON.stringify(this.authorId);
      this.insertAuthor.address=form.address;
      this.insertAuthor.name=form.name;
      this.insertAuthor.profession=form.profession;
      console.log("insert author",this.insertAuthor);
  }

  //   onSubmit(form:FormGroup){
  //     this.author=form.value;
  //     console.log(form);
  //     this.author.id=JSON.stringify(this.authorId);
  //     this.service.postAuthor(this.author);
  //     // if(this.authors)
  //     this.authors.splice(this.index,1,this.author);
  //     console.log("In authors component");
  //     console.log(this.authors);
  //     // localStorage.setItem('authors',JSON.stringify(this.authors));
      
  //     this.navRouter.navigate(['admin/authors']);
  //     // console.log("In author component");
      
  
  //     // localStorage.setItem('authors',JSON.stringify(this.author));
  //     // localStorage.setItem("item","ok");
  //     // let item=localStorage.getItem('authors');
  //     // console.log(item);
  //   }
  getService(){
    if(localStorage.getItem('authors')!=null){
      let authorData=localStorage.getItem('authors');
      let i=0;
      if(localStorage.getItem("books")){

        let booksData=localStorage.getItem("books");
        console.log(" books -------------> ");
        console.log(booksData);
      for(let entry of JSON.parse(booksData)){
        this.books.push(entry);
        let it:DropDownList=new DropDownList;
        it.id=this.books[i].id;
        it.itemName=this.books[i].name;
        i++;
        this.dropdownList.push(it);
        console.log(" dropdownList -------------> ");
        console.log(this.dropdownList)
      }

      }
      
      for(let entry of JSON.parse(authorData)){
        this.authors.push(entry);
      }
      let index=this.findIndex(this.authorId);
      this.author=this.authors[index];
      console.log("this.author");
      console.log(this.author);
    }
  //   console.log(this.authors);
  //   this.index=this.findIndex(this.authorId);
  //       this.createForm();
  //       this.imgurl=this.authors[this.index].imageurl;
  //       console.log(JSON.stringify(this.authors));
  //     // this.service.getAuthors().subscribe((data:Author[])=>{
  //     //   this.authors={...data};
  //     //   console.log(this.authors);
  //     //   this.createForm();
  //     //   this.imgurl=this.authors[this.authorId-1].imageurl;
  //     //   console.log(JSON.stringify(this.authors));
        
  //     // });
  // }
  // createForm(){
  //   this.form=new FormGroup({
  //     id:new FormControl({value:this.authors[this.index].id,disabled:true}),
  //     name:new FormControl(this.authors[this.index].name),
  //     address:new FormControl(this.authors[this.index].address),
  //     profession:new FormControl(this.authors[this.index].profession),
  //     bookslist:new FormControl(this.authors[this.index].bookslist),
  //     selectedItems:new FormControl()
  //   })
    // this.form=new FormGroup({
    //   authorid:new FormControl("Hello"),
    //   authorname:new FormControl("Hello"),
    //   address:new FormControl("Hello"),
    //   profession:new FormControl("Hello"),
    // })
  }

  getBook(form){
    // this.book.id=form.id;
    // this.book.name=form.name;
    // this.book.
  }

  findIndex(authorId:number){
    function findIdIndex(element:Author){
      return authorId===parseInt(element.id);
    }
    let index=this.authors.findIndex(findIdIndex);
    return index;
  }
  findBookIdIndex(bookId:number){
    function findIdIndex(element:Book){
      return bookId===element.id;
    }
    let index=this.books.findIndex(findIdIndex);
    return index;
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