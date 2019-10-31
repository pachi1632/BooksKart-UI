import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  invalidUsername: boolean;
  invalidPassword: boolean;

  constructor(private router:Router) {
    this.form=new FormGroup(
      {
        username:new FormControl("",Validators.required),
        password:new FormControl("",Validators.required)
      }
    )
   }

  ngOnInit() {
  }

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }
  onSubmit(){
    this.invalidUsername=false;
    this.invalidPassword=false;
    if(this.username.value!="pachi"){
      this.invalidUsername=true;
    }
    else if(this.password.value!="pachi1632"){
      this.invalidPassword=true;
    }
    else{
      this.router.navigate(['admin']);
    }
  }

}
