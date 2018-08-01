import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../User.model';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isValid: boolean;
  user: User;
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.isValid = false;
  }

  onSignup(form: NgForm) {
    if(this.isValid === false) {
      if(form.value.password !== form.value.password2) {
        alert('Passwords do not match');
      }
      else {
        this.isValid = true;
      }
    }
    else {
      console.log(form)
      this.userService.registerUser(form.value);
    }
    
  }

 
}
