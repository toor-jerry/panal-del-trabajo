import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/model.index';
import { NotificationService } from '../../services/service.index';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  notifications: Notification[] = [];

  constructor( public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications()
      .subscribe((notifications: Notification[]) => this.notifications = notifications);
  }

}
