import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.getUserAuth();
  }

  ngOnInit(): void {
  }

}
