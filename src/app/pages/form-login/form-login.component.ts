import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import swal from "sweetalert";
import { AuthService } from '../../services/service.index';

declare const gapi: any;

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  loginForm: FormGroup;

  auth2: any;
  userName: string;
  remember: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    try {
      this.googleInit();
    } catch (err) {
      swal('Error!!', `Ha ocurrido un errror, inténtelo de nuevo por favor.\nRevise su conexión a internet e inténtelo de nuevo.\n ${err}`, 'error');
    }
    this.userName = localStorage.getItem('userName') || '';
    if (this.userName !== '') {
      this.remember = true;
    }

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.loginForm = this.fb.group({
    user: [this.userName, [ Validators.required, Validators.minLength(4) ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    remember: this.remember
    });
  }

  auth(): void {
    if ( this.loginForm.invalid ) {
      this.loginForm.get('user').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }
    this.loading = true;
    this.authService.auth(

      this.loginForm.get('user').value,
      this.loginForm.get('password').value,
      this.loginForm.get('remember').value

    ).subscribe(() => this.router.navigate(['/profile']), err => this.loading = false);
  }


  formInvalid(dato: string): boolean {
    return this.loginForm.get(dato).invalid && this.loginForm.get(dato).touched;
  }

  // ==========================
  // Google
  // ==========================

  googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '266268775348-iqocukp3ju50oc1uunp5odfj1uo2cm5h.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('googleSignIn') );

    });
  }

  attachSignin( element ): void {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.authService.authGoogle(token)
      .subscribe(() => this.router.navigate(['/profile']));

    });
  }
}
