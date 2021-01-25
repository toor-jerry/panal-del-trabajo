import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CheckTokenGuard,
  AuthGuard,
  AdminGuard,
  EnterpriseRoleGuard,
  UserPlatinoGuard,
  ModalUploadService,
  SignupService,
  ThemeService,
  ChatService,
  UserService,
  EmploymnetService,
  QuestionService,
  AnswerService,
  MenuService,
  NotificationService,
  MessageService,
  UtilsService
  } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CheckTokenGuard,
    AuthGuard,
    AdminGuard,
    EnterpriseRoleGuard,
    UserPlatinoGuard,
    ModalUploadService,
    SignupService,
    ThemeService,
    ChatService,
    UserService,
    EmploymnetService,
    QuestionService,
    AnswerService,
    MenuService,
    NotificationService,
    MessageService,
    UtilsService
  ]
})
export class ServiceModule { }
