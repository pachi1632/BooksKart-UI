import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthorsService } from './../authors.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Author } from '../author';
import { Authors } from '../authors';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  author: Author;
  authors: Author[];

  constructor(private service:AuthorsService,private navRouter:Router,private activeRoute:ActivatedRoute) { }

  form:FormGroup;
  authorId:number;

  ngOnInit() {
     this.authors = [];
    //   let authorData = localStorage.getItem('authors');
    // for (let entry of JSON.parse(authorData)) {
    //   this.authors.push(entry);
    // }
   this.activeRoute.paramMap.subscribe((data:ParamMap)=>{
     this.authorId=parseInt(data.get('authorid'));
     console.log(this.authorId);
   })
    this.form=new FormGroup({
      id:new FormControl({value:this.authorId,disabled:true},Validators.required),
      name:new FormControl("",Validators.required),
      address:new FormControl("",Validators.required),
      profession:new FormControl("",Validators.required),
      imageurl: new FormControl("")
    })
  }
  onSubmit(form){
    this.author = form.value;
     //this.authors = [];
     console.log(form.value);
    console.log(this.author);
    this.author.id=JSON.stringify(this.authorId);
    if(localStorage.getItem('authors')!=null){
      let authorData = localStorage.getItem('authors');
      for (let entry of JSON.parse(authorData)) {
        this.authors.push(entry);
      }
    }
    this.authors.push(this.author);
    localStorage.setItem('authors',JSON.stringify(this.authors));
    this.navRouter.navigate(['admin/authors']);
  }

//   deleteAuthor(authorId){
//     this.authors.splice(authorId);
//     localStorage.setItem('authors',JSON.stringify(this.authors));
//   }

//  updateAuthor(authorId){
//   //this.author = form.value;
//  let oldValueIndex = this.authors.findIndex(authorId);
//   this.authors.splice(authorId);
// //
//   //this.authors.push(this.author);
//     localStorage.setItem('authors',JSON.stringify(this.authors));
//  }
}