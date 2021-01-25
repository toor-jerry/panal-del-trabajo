import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { SignupService } from '../../services/service.index';
import { Municipality } from "../../models/model.index";

import { User } from '../../models/model.index';

import swal from 'sweetalert';

// CHARGE-FOTO-POTRO-HERMANO.ts
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  loadingUser: boolean = false;
  loadingCheackingUser = false
  existeUsuario: boolean = false;
  especificarSexo: boolean = false;
  sexoTemp = "";
  tipoPassword = 'password';
  tipoPassword2 = 'password';
  toggleEye = true;
  toggleEye2 = true;
  loading = true;

  municipalitys: Municipality[];
  month: any[];
  userInput = ''
  userValid = false
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private signupService: SignupService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.signupService.getMunicipalitys().subscribe(muni => this.municipalitys = muni);
    this.month = this.signupService.getMonths();
    this.loading = false;
  }


  platino(): boolean{
  const ruta: string = this.router.url;
  return ruta.indexOf( 'signup/platino' ) >= 0 ? true : false ;
  }
  enterprise(): boolean {
    const ruta: string = this.router.url;
    return ruta.indexOf( 'signup/enterprise' ) >= 0 ? true : false ;
  }

  send(): void {

    if ( this.signUpForm.invalid ) {
      this.signUpForm.get('name').markAsTouched();
      this.signUpForm.get('last_name').markAsTouched();
      this.signUpForm.get('user').markAsTouched();
      this.signUpForm.get('email').markAsTouched();
      this.signUpForm.get('password').markAsTouched();
      swal('Formulario incompleto!', 'Asegurese de completar todos los campos obligatorios.', 'warning');
      return;
    }

    if ( !this.signUpForm.value.conditions ) {
      swal('Importante!', 'Debe aceptar los términos y condiciones de uso.', 'warning');
      return;
    }

    const user: User = {
      ...this.signUpForm.value
    };

    this.signupService.createUser(user).subscribe( res => {
      console.log('respuesta del servidor: ');
      console.log(res);
    });
  /* this.signUpForm.reset(); */
  }
  
  checkNameUser(user: string) {
    if (user === '' || user.length === 0 || user.length < 4) {
      return
    }
    this.loadingCheackingUser = true
    this.userValid = false
    this.signupService.checkUser(user)
    .subscribe(res => {
      this.loadingCheackingUser = false
      this.userValid = true
      swal('Usuario válido!!', user + '\nEs un nombre de usuario válido.', 'info')
    }, () => {
      this.loadingCheackingUser = false      
      this.userValid = false
    })
  }
crearFormulario(): void {

  this.signUpForm = this.fb.group({
    name: ['', Validators.required],
    last_name: [''],
    // user: ['', Validators.required, this.signupService.checkUserExists ],
    user: ['', Validators.required],
    email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ,],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    domicile: this.fb.group({
      street: [''],
      number: [''],
      colony: [''],
      municipality: [''],
      country: ['México']
    }),
    nacionality: [''],
    gender: [{value: '', disabled: true}],
    date_birth: [new Date()],
    speciality: [''],
    professional_titles: [''],
    last_job: [''],
    description: [''],
    photography: [''],
    cv: [''],
    credential: [''],
    whatsapp: [''],
    movil_phone: [''],
    telephone: [''],
    facebook: [''],
    twitter: [''],
    instagram: [''],
    youtube_channel: [''],
    blog_personal: [''],
    page_web: [''],
    location: ['0'],
    rfc: [''],
    conditions: [false, Validators.required]
  }, {
    validators: [this.signupService.passwordsMatch( 'password', 'password2' )]
  });
}

establecerSexo(gender: string) {
  this.signUpForm.get('gender');
  this.signUpForm.get('gender').setValue(gender);
}
habilitarCampoSexo() {
  this.especificarSexo = true;
  this.signUpForm.get('gender').setValue('');
  this.signUpForm.get('gender').enable();
}
mostrarPassword() {
  this.tipoPassword = 'text';
  this.toggleEye = false;
}
ocultarPassword() {
  this.tipoPassword = 'password';
  this.toggleEye = true;
}
mostrarPassword2() {
  this.tipoPassword2 = 'text';
  this.toggleEye2 = false;
}
ocultarPassword2() {
  this.tipoPassword2 = 'password';
  this.toggleEye2 = true;
}
}
