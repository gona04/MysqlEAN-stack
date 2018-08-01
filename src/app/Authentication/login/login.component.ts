import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    
    console.log(form);
    if(form.invalid) {
      return;
    }
    const user: User = {
      userId: null,
      fullName: null,
      emailId: form.value.emailId,
      password: form.value.password,
      password2: null,
      postId: null
    }
    
    this.userService.checkLogin(user)

  }
}
