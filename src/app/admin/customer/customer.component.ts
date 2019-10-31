import { element } from 'protractor';
import { CustomersService } from './../customers.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Customers } from '../customers';
import { FormGroup, FormControl } from '@angular/forms';
import { Customer } from '../customer';
import { DropDownList } from '../../drop-down-list';
import { Book } from '../book';
import { CustomerBook } from '../customer-book';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  selectedItems: { "id": number; "itemName": string; }[]=[];
  dropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  dropdownList: { "id": number; "itemName": string; }[]=[];
  books: Book[]=[];
  customerBooks: CustomerBook[]=[];

  constructor(private router:ActivatedRoute,private service:CustomersService,private navRouter:Router) { }
  customerId:number;
  customers:Customer[]=[];
  form:FormGroup;
  customer:Customer;
  index:number;
  ngOnInit() {
    this.router.paramMap.subscribe((data:ParamMap)=>{
      this.customerId=parseInt(data.get('customerid'));
      
      
      console.log("customerid",this.customerId);
      this.getService();
    })

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
  }
  getService(){
    let customerData=localStorage.getItem("customers");
    console.log(customerData);
    for(let entry of JSON.parse(customerData)){
      // console.log("hello");
      this.customers.push(entry);
    }
    
    this.index=this.findIndex(this.customerId);

    this.customer=this.customers[this.index];
    console.log("customer",this.customer);

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
    
    
    // this.createForm();
    // this.service.getCustomers().subscribe((data:Customer[])=>{
    //     this.customers={...data};
    //     this.createForm();
    // })
  }
  // createForm(){
  //     this.form=new FormGroup({
  //       customerid:new FormControl({value:this.customers[this.index].customerid,disabled:true}),
  //       name:new FormControl(this.customers[this.index].name),
  //       address:new FormControl(this.customers[this.index].address),
  //       list:new FormControl(this.customers[this.index].list),
  //     })
  // }
  findIndex(customerId:number){
    
    function findIdIndex(element:Customer){
      return parseInt(element.customerid)===customerId;
    }
     
    console.log(this.customers.findIndex(findIdIndex));
    console.log("index");
    this.index=this.customers.findIndex(findIdIndex);
    console.log(this.index);
    return this.index;
  }

  editCustomer(form){
    if(confirm("Are you sure")){
      this.customer=form;
      console.log("customer",this.customer.bookslist);
      this.customer.customerid=JSON.stringify(this.customerId);
      let index=this.findIndex(this.customerId);
      this.customers.splice(index,1,this.customer);
      
      // console.log("In customer component");
       console.log("customers",this.customers);
       console.log("customer",this.customer);
      // alert("submitted successfully");
        console.log(form.customerlist);
       for(let entry of form.bookslist){
        let bookIndex=this.findBookIdIndex(entry.id);
         console.log("bookindex",bookIndex);
        //  this.books[bookIndex].customerId=form.customerid;
      } 


      // console.log(this.customer.list)
      // let booksArray = [];
      // for(let entry of this.customer.list){
      //   for(let book of this.books){
      //     if(book.id==entry.id){
      //       book.customerId=entry.id;
      //       console.log(book);
      //     }
      //     booksArray.push(book);
      //   }
      // }
      //   this.books = booksArray;
      this.customerBooks=JSON.parse(localStorage.getItem('customerBooks'));
      if(this.customerBooks){
        console.log("customerBookData before",this.customerBooks);
        for(let i=this.customerBooks.length-1;i>=0;i-- ){
          if(parseInt(this.customerBooks[i].customer.customerid)==this.customerId){
            this.customerBooks.splice(i,1,);
          }
        }
      }
      this.updateCustomerBooks(form);
      console.log("customerBookData after",this.customerBooks);

      localStorage.setItem('customers',JSON.stringify(this.customers));
      localStorage.setItem("customerBooks",JSON.stringify(this.customerBooks));
      console.log("books",this.books);
    this.navRouter.navigate(['admin/customers']);
  
      //this.service.postCustomer(this.customer);
    };
    
    
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
     let index:number;
     if(this.customerBooks.length==0){
        index=0;
        id=1;
     }
     else{
      index=this.customerBooks.length-1;
      id=this.customerBooks[index].id+1;
     }
   }
   customerBook.id=id;
   customerBook.book=book;
   customerBook.customer=this.customer;
   return customerBook;
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
