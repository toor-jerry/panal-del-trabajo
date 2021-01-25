import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { User } from './../../models/model.index';
import { UserService, UsersService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users: User[] = [];
  total: number = 0;
  from: number = 0;
  page: number = 0;
  pages: number = 0;
  limit: number = 10;
  searchUsers: boolean = false;
  term: string = '';
  totalSearch: number = 0;

  loading = true;

  constructor(
    public userService: UserService,
    private usersService: UsersService,
    public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.loadUsers();

    this.modalUploadService.notif.subscribe(res => {
      if (this.searchUsers) {
        return this.search(this.term);
      }
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.usersService.getAllUsersDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.users = res.users;
      this.total = res.total;
      this.pages = Math.ceil(this.total / this.limit);
    });
  }

  delete = (user: User) => {
    swal({
      title: '¿Está segur@?',
      text: `Está opción eliminará al usuario ${user.user} | ${user.name} ${user?.last_name} de forma permanente!!`,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.usersService.deleteUser(user._id, this.from, this.limit, this.searchUsers, this.term).subscribe((res: any) => {
          if (res.users?.length > 0) {
            this.users = res.users;
            this.total = res.total;
            if (this.searchUsers) {
              this.totalSearch -= 1;
              this.pages = Math.ceil( this.totalSearch / this.limit );
            } else {
              this.pages = Math.ceil( this.total / this.limit );
            }
          } else {
            if (this.from > 0) {
              this.from -= this.limit;
              this.page -= 1;
              if (!this.searchUsers) {
                this.loadUsers();
              } else {
                this.totalSearch -= 1;
                this.search(this.term);
              }
            } else {
              this. page = 0;
              this.pages = 0;
              this.users = [];
              this.from = 0;
              this.totalSearch = 0;
            }
          }
        });
      }
    });

  }

  showModal(id: string): void {
    this.modalUploadService.showModal( 'img', 'photography', id);
  }

  search( term: string ): void {
    this.term = term.trim();
    this.loading = true;
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.searchUsers = false;
      this.from = 0;
      this.page = 0;
      this.pages = 0;
      this.loadUsers();
      return;
    }
    if (this.searchUsers === false) {
      this.from = 0;
      this.page = 0;
      this.pages = 0;
      this.totalSearch = 0;
      this.users = [];
    }

    this.usersService.searchInUsers(this.term, this.from)
    .subscribe( (res: any) => {

      this.loading = false;
      this.searchUsers = true;
      if (res.users?.length > 0) {
        this.users = res.users;
        this.totalSearch = res.total;
        this.pages = Math.ceil(this.totalSearch / this.limit);
      } else {
        this.users = [];
        this.totalSearch = 0;
        this.pages = 0;
      }

    });
  }

  update(user: User): void {
    this.userService.updateUser(user).subscribe();
  }

  changePassword(user: User): void {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingrese la nueva contraseña",
          type: "password",
        },
      },
      buttons: {
        confirm: true,
        cancel: true,
      },
    })
    .then( res => {
      if (res) {
        let passwordTmp = res;
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Repita la contraseña",
              type: "password",
            },
          },
          buttons: {
            confirm: true,
            cancel: true,
          },
        })
        .then( res => {
          if (res) {
            if (res !== passwordTmp) {
              swal('Las contraseñas no coinciden!!', '', 'warning')
              return;
            }
            let userTmp = user;
            userTmp.password = res;
          this.userService.updateUser(userTmp).subscribe();
          }
        });
        }
      });
  }

  changePagination( fromPage: number, page: number ): void {
    const from = this.from + fromPage;

    if (this.searchUsers && (from >= this.totalSearch)) {
      return;
    } else if (from >= this.total) {
      return;
    }

    if (from < 0) {
      return;
    }
    this.page += page;
    this.from += fromPage;
    if (this.searchUsers) {
      this.search(this.term);
    } else {
      this.loadUsers();
    }
  }

}
