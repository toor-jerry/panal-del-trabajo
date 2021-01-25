import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/service.index';
import { User } from '../../models/model.index';
import swal from 'sweetalert';
import { ChatService } from '../../services/profile/chat/chat.service';
import { UsersService } from '../../services/profile/users/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  loading: boolean = false;
  users: User[] = [];
  searchUsers = false;
  from: number = 0;
  total: number = 0;
  page: number = 1;
  pages: number = 1;
  term: string = '';
  filter: string = 'Estudiantes';
  nFilter: number = 1;
  route = '';
  totalSearch = 0;
  contacts: string[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private chatService: ChatService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.chatService.getContactsOnlyId()
      .subscribe(users => {
        
       this.contacts = this.contacts.concat(users) 
      },
        err => this.showSwalError(err));

    this.chatService.getContactsOnChatsOnlyId()
      .subscribe(users => {
        
        this.contacts = this.contacts.concat(users)
      },
        err => this.showSwalError(err));
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.from, this.route).subscribe((res: any) => {
      this.loading = false;
      this.total = res.total;
      if (res.total > 0) {
        this.users = res.users;
        this.pages = Math.ceil(this.total / 10);
      }
    }, err => {
      this.loading = false;
      this.showSwalError(err);
    })
  }

  getUser( id: string ): void{
    this.router.navigate(['/user', id]);
  }

  changeFilter(type: number) {
    if (type === this.nFilter) {
      return;
    }
    switch(type) {
      case 1:
        this.resetSearchUsers('Estudiantes', '', type);
        break;
      case 2:
        this.resetSearchUsers('Empresas','enterprises', type);
        break;
    }
  }

  changePagination( page: number ): void {
    const from = this.from + page;
  
    if (from >= this.total) {
      return;
    }
  
    if (from < 0) {
      return;
    }
    if (page > 0) {
      this.page += 1;
    }else {
      this.page -=1;
    }
    this.from += page;
  if (this.searchUsers) {
    this.getSearch()
  }else {
    this.getUsers();
  }
  }
  resetSearchUsers(filter: string, route: string, type: number) {
    this.filter = filter;
    this.route = route;
    this.from = 0;
    this.nFilter = type;
    this.getUsers();
  }

  showSwalError(err) {
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }

  search( term: string, event ): void {
    event.preventDefault();

    this.term = term.trim();
    this.loading = true;
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.searchUsers = false;
      this.from = 0;
      this.page = 1;
      this.pages = 1;
      this.total= 0;
      this.getUsers()
      return;
    }
    if (this.searchUsers === false) {
      this.from = 0;
      this.page = 1;
      this.pages = 1;
      this.users = [];
      this.total = 0;
    }

    this.getSearch()
  }

  getSearch() {
    this.usersService.searchInUsers(this.term, this.from)
    .subscribe( (res: any) => {

      this.loading = false;
      this.searchUsers = true;
      if (res.users?.length > 0) {
        this.users = res.users;
        this.total = res.total;
        this.pages = Math.ceil(this.total / 10);
      } else {
        this.users = [];
        this.total = 0;
        this.pages = 1;
      }

    });
  }
  
}
