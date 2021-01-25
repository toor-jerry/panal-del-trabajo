import { Component, OnInit } from '@angular/core';
import { ForoumService } from '../../services/profile/foroum/foroum.service';
import swal from 'sweetalert';
import { Room } from '../../models/room/room.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { RoomService } from '../../services/profile/room/room.service';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.css']
})
export class ForosComponent implements OnInit {

  foros: Room[] = []
  loading = false
  from = 0
  totalMyForos = 0
  totalForos = 0
  showMyForos = false
  titleLabel = 'Todos los foros'
  totalTmp = 0
  user: User
  constructor(
    private foroumService: ForoumService,
    private userService: UserService,
    private roomService: RoomService
  ) {
    this.countAndGetAllForoums()
  }
  
  ngOnInit(): void {
    this.user = this.userService.getUserAuth()
  }
  countAndGetAllForoums() {
    this.loading = true
    this.foroumService.countAndGetAllForoums(this.from)
    .subscribe((res: any) => {
      this.totalMyForos = res.myForos
      this.totalForos = res.allForos
      this.foros = res.foros.concat(this.foros)
      this.from += 10
      this.totalTmp = this.totalForos
      
      this.loading = false
    }, err => this.showSwalError(err))
  }

  getAllForos() {
    if (this.totalForos === 0) {
      return this.showErrorNoData()
    }
    if (this.showMyForos) {
      this.from = 0
      this.showMyForos = false
      this.titleLabel = 'Todos los foros'
      this.foros = []
    }
    if (this.totalForos < this.from) {
      return
    }
    this.loading = true
    this.foroumService.getAllForoums(this.from)
    .subscribe((res: any) => {
      this.totalForos = res.total
      this.totalTmp = this.totalForos
      this.foros = res.foros.concat(this.foros)
      this.from += 10
      this.loading = false
    }, err => this.showSwalError(err))
  }

  getMyForos() {
    if (this.totalMyForos === 0) {
      return this.showErrorNoData()
    }
    if (!this.showMyForos) {
      this.foros = []
      this.from = 0
      this.showMyForos = true
      this.titleLabel = 'Mis foros'
    }
    if (this.totalMyForos < this.from) {
      return
    }
    this.loading = true
    this.foroumService.getAllMyForoums(this.from)
    .subscribe((res: any) => {
      
      this.totalMyForos = res.total
      this.totalTmp = this.totalMyForos
      this.foros = res.foros.concat(this.foros)
      this.from +=10
      this.loading = false
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
            .subscribe(res => {
              
              swal('Foro eliminado!', foro.name + ', ha sido eliminado.', 'success' )
              .then(() => this.countAndGetAllForoums())
            }, err => this.showSwalError(err))
          } else {
            swal('El nombre del foro no coincide', '', 'warning')
          }
        });  
        
      }
    });
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

  showErrorNoData() {
    swal({
      title: 'No existen foros que mostrar!!',
      text: 'Lamentamos el inconveniente.\nLe recordamos que puede crear uno en el momento que usted desee dando click en el botón "Crear un foro".',
      icon: 'warning'
    });
  }

  showSwalError(err) {
    this.loading = false
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }

  sendRequestJoin(foro: string) {
    this.showLoading()
    this.roomService.addRequest(foro, this.user._id) 
    .subscribe(res => {
      this.foros = this.foros.filter(foroTmp => {
        return foroTmp._id+'' !== foro
      })
      swal('Petición enviada con éxito!', 'Los administradores del foro le darán acceso al foro.', 'success')
    }, err => this.showSwalError(err))
  }
}
