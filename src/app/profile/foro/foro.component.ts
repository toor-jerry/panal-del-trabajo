import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForoumService } from '../../services/profile/foroum/foroum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/profile/room/room.service';
import swal from 'sweetalert';
import { UserService } from '../../services/user/user.service';
import { Room } from '../../models/room/room.model';
import { UsersService } from '../../services/profile/users/users.service';
import { User } from '../../models/user/user.model';


@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  foroForm: FormGroup;
  foro: Room
  edit = false
  loading = true
  totalSearch = 0 // total users (participants)
  totalSearchAdmins = 0 // total users (admins)
  users: User[] = []
  admins: User[] = []
  from = 0 // participants
  fromAdmin = 0
  participants: string[] = []
  userParticipants: User[] = []
  joinRequest: User[] = [] // usuarios que se quieren unir al foro
  I: User
  userAdmins: User[] = []
  searchUsers = false // flag wold be show "No data"
  searchAdmins = false // flag wold be show "No data"
  loadingSearchingParticipants = false
  loadingSearchingAdmins = false
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private foroumService: ForoumService,
    private roomService: RoomService,
    private userService: UserService,
    private UsersService: UsersService
  ) {
    this.I = this.userService.getUserAuth()
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== 'new') {
        this.roomService.getById(params['id'])
        .subscribe(res => {
          this.foro = res
          
          this.foroForm.get('name').setValue(this.foro.name)
          this.foroForm.get('private').setValue(this.foro.private)
          this.userParticipants = res.participants
          this.userAdmins = res.admins
          this.joinRequest = res.joinRequest
          
          this.loading = false
          this.edit = true;
          
        }, err => this.showSwalError(err));
      } else {
        this.loading = false
        this.userAdmins.push(this.userService.getUserAuth())
      }
    });
  }

  ngOnInit(): void {
    this.createForm()
  }

  showSwalError(err) {
    this.loading = false
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }

  persistData() {
    
    if (this.loadingSearchingParticipants || this.loadingSearchingAdmins) {
      return
    }
    if (this.userAdmins.length ===0) {
      return swal({
        title: 'Campos incompletos!!',
        text: 'No ha seleccionado aún un administrador, este campo es obligatorio!!',
        icon: 'warning'
      })
    }
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de crear el foro, ¿desea continuar?',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        
        if (this.edit) {
          this.update()
        } else {
          this.createForo()
        }
      }
    });
  }

  searchUser(termSearch: string, newSearch = true) {
    let term = termSearch.trim();
    this.loadingSearchingParticipants = true
    this.searchUsers = true
    
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.totalSearch = 0;
      this.from = 0
      this.loadingSearchingParticipants = false
      return;
    }
    this.UsersService.searchInUsers(term, this.from)
    .subscribe( (res: any) => {
      this.totalSearch = res.total;
      this.loadingSearchingParticipants = false
      if (newSearch) {
        this.users = []
        this.from = 0
      }
      this.users = res.users.concat(this.users)
      if (res.users.length > 0) {
        this.from +=10
      }

    }, err => {
      this.loadingSearchingParticipants = false
      this.showSwalError(err)
    });
  }

  searchAdmin(termSearch: string, newSearch = true) {
    let term = termSearch.trim();
    this.loadingSearchingAdmins = true
    this.searchAdmins = true

    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.totalSearchAdmins = 0;
      this.fromAdmin = 0
      this.loadingSearchingAdmins = false
      return;
    }
    this.UsersService.searchInUsers(term, this.fromAdmin)
    .subscribe( (res: any) => {
      this.totalSearchAdmins = res.total;
      this.loadingSearchingAdmins = false
      if (newSearch) {
        this.admins = []
        this.fromAdmin =0 
      }
      this.admins = res.users.concat(this.admins)
      
      if (res.users.length > 0) {
        this.fromAdmin +=10
      }

    }, err => {
      this.loadingSearchingAdmins = false
      this.showSwalError(err)
    });
  }

  createForm(): void{
    let user = this.userService.getUserAuth()
    let nameForo = ''
    
    if (!this.foro?.name) {
      nameForo += 'Foro de ' + user.name
      if (user?.last_name)
        nameForo += ' ' + user.last_name
    }

    this.foroForm = this.fb.group({
    name: [nameForo, [ Validators.required, Validators.minLength(3) ] ],
    theme: '',
    private: [false, [ Validators.required] ],
    type: ['FORO', [ Validators.required] ],
    participants: [],
    admins: [Validators.required]
    });
  }

  createForo() {
    if ( this.foroForm.invalid ) {
      swal('Complete los campos "Nombre"!!', '', 'warning');
      return;
    }
    
        if (!this.foro) {
          this.foro = {
            ...this.foroForm.value
          }
          let arrayTemp = []
          this.userParticipants.filter(user => {
            arrayTemp.push(user._id)
          })
          this.foro.participants = arrayTemp.join(',')
          arrayTemp = []
          this.userAdmins.filter(user => {
            arrayTemp.push(user._id)
          })
          this.foro.admins = arrayTemp.join(',')
          
        }
    
    this.showLoading();

    this.roomService.create(this.foro)
      .subscribe(() => {
        swal('Foro creado!', 'Foro creado con éxito!\n'+ this.foro?.name ? this.foro.name : '', 'success')
        .then(() => this.router.navigate(['/profile/foros']))
      }, err => this.showSwalError(err))
    
  }

  update(): void {
    this.foro.name = this.foroForm.value.name
    this.foro.private = this.foroForm.value.private
      
      this.showLoading();
      this.roomService.update(this.foro)
      .subscribe(() => {
        swal('Foro actualizado!', 'Foro actualizado con éxito!\n'+ this.foro?.name ? this.foro.name : '', 'success')
      }, err => this.showSwalError(err));
  }

  showLoading() {
    swal({
      title: 'Espere por favor...',
      icon: '../../../assets/img/Wedges-3s-200px.svg',
      buttons: [false, false],
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
  }

  addUserParticipant(user: User) {
    this.showLoading()
    this.roomService.addParticipant(this.foro._id, null,user._id)
    .subscribe(() => {
      let name = user.name + ' ';
    name += user?.last_name ? user.last_name : '';
      swal('Participante agregado!', name + ', ha sido agregado al foro.', 'success' )
      this.userParticipants.push(user)
      this.users = this.users.filter(usr => {
        return usr._id !== user._id
      })
    }, err => this.showSwalError(err))
  }

  removeUserParticipant(user: User) {
    this.showLoading()
    this.roomService.removeParticipantAdmin(this.foro._id, user._id)
    .subscribe(() => {
      let name = user.name + ' ';
    name += user?.last_name ? user.last_name : '';
      swal('Participante eliminado!', name + ', ha sido removido del foro.', 'success' )
      
      this.userParticipants = this.userParticipants.filter(usr => {
        return usr._id !== user._id
      })
      this.users.push(user)
    }, err => this.showSwalError(err))
  }

  addUserAdmin(user: User) {
    
    this.showLoading()
    this.roomService.addAdmin(this.foro._id, null,user._id)
    .subscribe(() => {
      let name = user.name + ' ';
    name += user?.last_name ? user.last_name : '';
      swal('Administrador agregado!', name + ', ha sido agregado al foro.', 'success' )
      
      this.userAdmins.push(user)
      this.admins = this.admins.filter(usr => {
        return usr._id !== user._id
      })
    }, err => this.showSwalError(err))
  }

  removeUserAdmin(user: User) {
    this.showLoading()
    this.roomService.removeParticipantAdmin(this.foro._id, null, user._id)
    .subscribe(() => {
      let name = user.name + ' ';
    name += user?.last_name ? user.last_name : '';
      swal('Administrador eliminado!', name + ', ha sido removido del foro.', 'success' )
      
      this.userAdmins = this.userAdmins.filter(usr => {
        return usr._id !== user._id
      })
      this.admins.push(user)
    }, err => this.showSwalError(err))
  }

  deleteForo(foro: Room) {
    swal({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar el foro '${foro.name}', \n Esto eliminará todos los mensaje, archivos e imágenes que se encuentren en el foro de manera permanente, \n¿desea continuar?`,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Ingrese el nombre del foro",
              type: "text",
            },
          },
          buttons: {
            confirm: true,
            cancel: true,
          },
        })
        .then( nameForo => {
          
          if (nameForo === foro.name) {
            this.roomService.delete(foro._id)
            .subscribe(() => {
              
              swal('Foro eliminado!', foro.name + ', ha sido eliminado.', 'success' )
              .then(() => this.router.navigate(['/profile/foros']))
            }, err => this.showSwalError(err))
          } else {
            swal('El nombre del foro no coincide', '', 'warning')
          }
        });  
        
      }
    });
  }


  addParticipant(user: User) {
    swal({
      title: '¿Está seguro?',
      text: `Está a punto de agregar al foro a '${user.name} ${user?.last_name ? user.last_name : ''}', \n Esto quiere decir que el usuario tendrá acceso a los post publicados, publicar entre otras acciones, \n¿desea continuar?`,
      icon: 'info',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.showLoading()
        this.roomService.deleteRequest(this.foro._id, user._id)
        .subscribe(() => {
          let name = user.name + ' ';
          name += user?.last_name ? user.last_name : '';
          swal('Participante agregado!', name + ', ha sido agregado al foro.', 'success' )
          this.userParticipants.push(user)
          this.joinRequest = this.joinRequest.filter(usr => {
            return usr._id !== user._id
          })
        }, err => this.showSwalError(err))
      }
    });
  }
}
