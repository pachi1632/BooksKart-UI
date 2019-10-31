import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TestComponent } from './test/test.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';

import { BookComponent } from './book/book.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthorComponent } from './author/author.component';
import { CustomerComponent } from './customer/customer.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    FormsModule
  ],
  declarations: [TestComponent, BooksComponent, AuthorsComponent, CustomersComponent, HomeComponent, BookComponent, AdminHomeComponent, AuthorComponent, CustomerComponent, AddAuthorComponent, AddBookComponent, AddCustomerComponent]
})
export class AdminModule { }
