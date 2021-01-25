import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../services/service.index';
import { MenuResponse } from '../../models/model.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.css']
})
export class MenuManagerComponent implements OnInit {

  loading: boolean = true;
  menus: MenuResponse[] = [];
  menu;
  menuResponse: MenuResponse;

  constructor( private menuService: MenuService ) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(): void {
    this.loading = true;
    this.menuService.getMenus()
      .subscribe((menus: MenuResponse[]) => {
        this.loading = false;
        this.menus = menus;
      });
  }

  update(menu: MenuResponse): void {
    this.menuService.updateMenu(menu)
      .subscribe();
  }

  delete(id: string): void {
    swal({
      title: '¿Está segur@?',
      text: `Está opción eliminará el menú de forma permanente!!`,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
    this.menuService.deleteMenu(id)
      .subscribe(() => {
        this.menus.filter(menu => {
          this.getMenus();
        });
      });
    }
  });

}
  sync(): void {
    this.getMenus();
  }

}
