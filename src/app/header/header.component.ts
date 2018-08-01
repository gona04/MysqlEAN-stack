import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from '../Authentication/user-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription; 
  userIsAuthenticated = false;
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthenticationStatusListener().subscribe(isAthenticated => {
      this.userIsAuthenticated = isAthenticated;
    })
  }

  onLogout() {
    
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

 
}
