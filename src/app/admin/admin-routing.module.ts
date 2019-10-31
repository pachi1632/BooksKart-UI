import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { AuthorsComponent } from './authors/authors.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthorComponent } from './author/author.component';
import { CustomerComponent } from './customer/customer.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'',
        component:AdminHomeComponent
      },
      {
        path:'home',
        component:AdminHomeComponent
      },
      {
        path:'books',
        component:BooksComponent
      },
      {
        path:'book/:bookid',
        component:BookComponent
      },
      {
        path:'authors',
        component:AuthorsComponent
      },
      {
        path:'author/:authorid',
        component:AuthorComponent
      },
      {
        path:'customers',
        component:CustomersComponent
      },
      {
        path:'customer/:customerid',
        component:CustomerComponent
      },
      {
        path:'addAuthor/:authorid',
        component:AddAuthorComponent
      },
      {
        path:'addBook/:bookid',
        component:AddBookComponent
      },
      {
        path:'addCustomer/:customerid',
        component:AddCustomerComponent
      },
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
