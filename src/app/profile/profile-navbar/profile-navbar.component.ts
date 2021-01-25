import { Component, OnInit, Input } from '@angular/core';
import { ThemeProfileService, UserService } from '../../services/service.index';


@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  theme: string;
  view: boolean = false;
  notif: boolean = false;
  messages: boolean = false;
  @Input() status: boolean = true;
  constructor(
    private themeProfileService: ThemeProfileService,
    public userService: UserService
  ) {
    this.theme = 'bg-' + this.themeProfileService.getThemeSideBar();
  }

  ngOnInit(): void {
    this.userService.getMenu().filter(item => {
      if (item?.notifications) {
        this.notif = true;
      }

      if (item?.notificationsMessages) {
        this.messages = true;
      }
    });
  }

}
