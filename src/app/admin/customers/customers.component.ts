import { CustomerBook } from './../customer-book';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customers } from '../customers';
import { Customer } from '../customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  customerBooks:CustomerBook[]=[];

  constructor(private service:CustomersService,private router:Router) { }

  ngOnInit() {
    this.customers=[];
    console.log(this.customers);
    if(localStorage.getItem('customers')!=null){
      let customersData=localStorage.getItem('customers');
      for(let entry of JSON.parse(customersData)){
        this.customers.push(entry);
      }
      console.log(this.customers.length+1);
    }
    if(localStorage.getItem('customerBooks')!=null){
      this.customerBooks=JSON.parse(localStorage.getItem('customerBooks'));
    }
    // //*****IMP Don't delete */
    // this.service.getCustomers().subscribe((data:Customer[])=>{
    //   for(let entry of data){
    //     this.customers.push(entry);
    //   }
    //   localStorage.setItem('customers',JSON.stringify(this.customers));
    //   //this.customers={...data};
    //   console.log(this.customers);
    // })
  }
  onClick(customer){
    this.router.navigate(['admin/customer',customer.customerid]);
  }
  addCustomer(){
    if(this.customers.length!=0){
      let index=this.customers.length;
    console.log(index);
    let id=parseInt(this.customers[index-1].customerid)+1
    this.router.navigate(['admin/addCustomer',id]);
    }
    else{
      this.router.navigate(['admin/addCustomer',1]);
    }
    
  }
  onDelete(customer:Customer){
    function findIdIndex(element){
      return customer.customerid===element.customerid;
    }
    if(confirm("Do you want to Delete??")){
      let id=this.customers.findIndex(findIdIndex);
      this.customers.splice(id,1);

      //////////Updating cusomerBooks
      for(let customerBookIndex=this.customerBooks.length-1;customerBookIndex>=0;customerBookIndex--){
        if(this.customerBooks[customerBookIndex].customer.customerid==customer.customerid){
          this.customerBooks.splice(customerBookIndex,1);
        }
      }
      console.log("this customerBooks",this.customerBooks);
      localStorage.setItem("customerBooks",JSON.stringify(this.customerBooks));
      localStorage.setItem("customers",JSON.stringify(this.customers));
      console.log(id);
    }
  }

}
