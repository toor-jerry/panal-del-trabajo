import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Conection } from '../../models/model.index';
import swal from 'sweetalert';
import { User } from '../../models/model.index';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.css']
})
export class SecuritySettingsComponent implements OnInit {

  showListSetions: boolean = false;
  setions: Conection[] = [];
  loading: boolean = false;
  total = 0;
  from: number = 0;
  page = 1;

  constructor( public userService: UserService ) {}

  ngOnInit(): void {
  }

  showConnections(): void {
    this.showListSetions = true;
    this.loading = true;
    this.userService.getSetionsDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.setions = res.connections;
      this.total = res.total;
    });
  }

  showMore( fromPage: number, page: number ): void {

    let from = this.from + fromPage;

    if (from >= this.total) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from += fromPage;
    this.page += page;
    this.showConnections();

  }

  deleteSetions(): void {
    swal({
      title: '¿Está segur@?',
      text: 'Está a punto de eliminar todo su historial de sesiones, recuerde que solo es con el fin de brindarle una mejor seguridad.',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.userService.deleteSetionsDB().subscribe(res => {
          this.setions = [];
          this.total = 0;
          this.from = 0;
        });
      }
    });

  }

  deleteAccount(): void {

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar su cuenta de manera permanente, todos sus datos serán eliminados de manera permanente!!',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.userService.deleteAccount().subscribe(res => {
          this.setions = [];
          this.total = 0;
          this.from = 0;
        });
      }
    });

  }

  changePasswordDB(pwd: string): void {
    if (!pwd || pwd === '') {
      swal('El campo se encuentra vacío!', '', 'info');
      return;
    }
    if (pwd.length < 5) {
      swal('Su cantreseña debe superar los 5 caracteres!', '', 'info');
      return;
    }
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
        if (res !== pwd) {
          swal('Las contraseñas no coinciden', '', 'warning')
          return;
        }
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Ingrese su contraseña anterior",
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
            this.userService.checkPassword(res)
              .subscribe(() => {
                swal({
                  title: '¿Está seguro?',
                  text: 'Está a punto de cambiar su contraseña, tendrá que volver a iniciar sesión.',
                  icon: 'warning',
                  buttons: ['Cancelar', 'De acuerdo'],
                  dangerMode: true
                })
                .then( res => {
                  if (res) {
                    const user: User = this.userService.getUserAuth();
                    user.password = pwd;
                    this.userService.updateUserChangePassword(user)
                      .subscribe((res: any) => {
                        swal('Contraseña actualizada correctamente!', `${user.name} ${user.last_name}`, 'success');
                        if (res.data.changePassword) {
                          this.userService.logOut();
                        }
            
                      });
                  }
                });
              }, err => {
                swal('Error!', 'Verifique su contraseña\n' + err, 'error')
              })
          } else {
            swal('Cancelación del cambio!', '', 'warning')
          }
        });
      }
    });

  }

}
