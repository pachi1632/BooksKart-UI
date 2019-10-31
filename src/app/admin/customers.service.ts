import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customers } from './customers';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }
  getCustomers(){
    return this.http.get<Customer[]>('assets/customers.json');
  }
  postCustomer(customer:Customer){
    console.log("In customer service");
    console.log(customer);
    return this.http.post('assets/customers.json',customer);
  }
}
