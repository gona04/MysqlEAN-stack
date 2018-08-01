import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.model';
import { UserServiceService } from './Authentication/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 constructor(private userService: UserServiceService) {}

 ngOnInit() {
  this.userService.autoAuthorization();
 }
}
