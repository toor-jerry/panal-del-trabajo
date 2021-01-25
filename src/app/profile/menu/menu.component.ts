import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MenuService } from '../../services/service.index';
import { ItemMenu, MenuResponse } from '../../models/model.index';
import swal from 'sweetalert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuForm: FormGroup;
  edit: boolean;
  menu: ItemMenu[] = [];
  menuResponse: MenuResponse = {
    description: 'Nuevo menú',
    role: 'USER_ROLE',
    menu: this.menu
  };
  itemEdit: ItemMenu;
  loading: boolean = true;
  image: boolean = false;
  move: boolean = true;
  fieldMenu: ItemMenu;
  action: string = 'Actualizar';
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== 'new') {
        this.menuService.getMenu(params['id'])
        .subscribe(menu => {
          this.menuResponse = menu;
          this.menuResponse._id = params['id'];
          this.menu = this.menuResponse.menu;
        });
        this.edit = true;
      } else {
        this.action = 'Crear';
        this.edit = false;
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
    
  }

  update(menu: MenuResponse): void {
    this.showLoading();
    this.menuService.updateMenu(menu)
      .subscribe(() => {
        swal.stopLoading();
        swal.close();
      }, err => {
        swal.stopLoading();
        swal.close();
        this.showSwalError(err);
      });
  }

  drop( event: CdkDragDrop<any> ): void {
    if (this.move) {
      moveItemInArray( this.menu, event.previousIndex, event.currentIndex );
      this.menuResponse.menu = this.menu;
    } else {
        for (let index = event.previousIndex; index < this.menu.length - 1; index++) {
          this.menu[index] = this.menu[index + 1];
        }
        this.menu.pop();
    }
  }

  editField(menu: ItemMenu): void {
    this.itemEdit = menu;
    this.menuForm.get('title').setValue(menu.title);
    this.menuForm.get('ruta').setValue(menu.ruta);

    this.menuForm.get('icon').setValue(menu.icon);
    this.menuForm.get('img').setValue(menu.img);
  }
  createForm(): void{
    this.menuForm = this.fb.group({
    icon: [''],
    img: [''],
    title: ['', [ Validators.required, Validators.minLength(3) ] ],
    ruta: ['', Validators.required],
    notifications: [false],
    notificationsMessages: [false]
    });
  }

  addItem() {
    if ( this.menuForm.invalid ) {
      swal('Complete los campos "Titulo" y "Ruta" cuando menos!!', '', 'warning');
      return;
    }
    this.menu.push(this.menuForm.value);
    this.menuResponse.menu = this.menu;
    
    this.showLoading();

    this.menuService.updateMenu(this.menuResponse)
      .subscribe(() => {
        swal.stopLoading();
        swal.close();
      }, err => {
        this.menu.pop();
        this.menuResponse.menu = this.menu;
        swal.stopLoading();
        swal.close();
        this.showSwalError(err);
      })
    
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
  showSwalError(err) {
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }
}
