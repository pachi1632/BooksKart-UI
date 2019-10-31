import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { DISABLED } from '@angular/forms/src/model';
import { DropDownList } from '../../drop-down-list';
import { Book } from '../book';
import { CustomerBook } from '../customer-book';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  selectedItems: { "id": number; "itemName": string; }[]=[];
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  dropdownList: { "id": number; "itemName": string; }[]=[];
  customerBooks: CustomerBook[]=[];

  constructor(private service:CustomersService,private router:ActivatedRoute,private router2:Router) { }

  form:FormGroup;
  customer=new Customer;
  customers:Customer[]=[];
  customerid:number;
  books:Book[]=[];

  ngOnInit() {
    this.router.paramMap.subscribe((data:ParamMap)=>{
          this.customerid=parseInt(data.get('customerid'));
    })
    this.customer.customerid=JSON.stringify(this.customerid);
    console.log(this.customer.customerid);
    this.customer.address="";
    this.customer.bookslist=[];
    this.customer.name="";

    if(localStorage.getItem('customers')!=null){
      let customersData=localStorage.getItem('customers');
      for(let entry of JSON.parse(customersData)){
        this.customers.push(entry);
      }
    }
    if(localStorage.getItem('books')!=null){
      let booksData=localStorage.getItem('books');
      let i=0;
      for(let entry of JSON.parse(booksData)){
        this.books.push(entry);
        let it:DropDownList=new DropDownList;
        it.id=entry.id;
        it.itemName=entry.name;
        i++;
        console.log(it);
        console.log(i);
        this.dropdownList.push(it);
      }
    }
    this.customerBooks=JSON.parse(localStorage.getItem('customerBooks'));

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
  {"id":2,"itemName":"Singapore"},
  {"id":3,"itemName":"Australia"},
  {"id":4,"itemName":"Canada"},
  {"id":5,"itemName":"South Korea"}
];
this.dropdownSettings = { 
    singleSelection: false, 
    text:"Select Books",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class"
  };
    // this.form=new FormGroup({
    //   customerid:new FormControl({value:this.customerid,disabled:true},[Validators.required,
    //     //disabled:true
    //   ]),
    //   name:new FormControl("",Validators.required),
    //   address:new FormControl("",Validators.required),
    //   list:new FormControl("",Validators.required),
    // })
  }

  addCustomer(form){
      this.customer=form;

      this.customer.customerid=JSON.stringify(this.customerid);

      this.customers=[];
      // this.form.patchValue({
      //   customerid:this.customerid
      // })
      console.log(this.customer);
      if(localStorage.getItem('customers')!=null){
          let customersData=localStorage.getItem('customers');
          for(let entry of JSON.parse(customersData)){
              this.customers.push(entry);
          }
      }
      this.customers.push(this.customer);
      console.log(this.customers);
      console.log("hello");
      console.log(form);
      for(let entry of form.bookslist){
        let bookIndex=this.findBookIdIndex(entry.id);
         console.log("bookindex",bookIndex);
        //  this.books[bookIndex].customerId=form.customerid;
      }
       this.updateCustomerBooks(form);
      console.log(this.books);
      console.log("customerBooks",this.customerBooks);
       localStorage.setItem('customerBooks',JSON.stringify(this.customerBooks));
      localStorage.setItem('customers',JSON.stringify(this.customers));
      localStorage.setItem('books',JSON.stringify(this.books));
      this.service.postCustomer(this.customer);
      this.router2.navigate(['admin/customers']);
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

 updateCustomerBooks(form){
   console.log("form",form.name);
   for(let entry of this.customer.bookslist){
     let customerBook=this.getCustomerBook(entry);
     this.customerBooks.push(customerBook);
   }
 }
 getCustomerBook(book){
   let customerBook=new CustomerBook;
   console.log("customerBook",customerBook);
   let id:number;
   if(this.customerBooks==null) {
     this.customerBooks=[];
    id=1;
  }
  else{
    let index:number=this.customerBooks.length-1;
    id=this.customerBooks[index].id+1
  }
  customerBook.id=id;
  customerBook.book=book;
  customerBook.customer=this.customer;
  return customerBook;
 }

}
