import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, Municipality } from '../../models/model.index';
import { SignupService, UserService  } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-information-settings',
  templateUrl: './information-settings.component.html',
  styleUrls: ['./information-settings.component.css']
})
export class InformationSettingsComponent implements OnInit {

  user: User;
  token: string;
  form: FormGroup;
  especificarSexo: boolean;
  imageUpload: File;
  imageTemp: string | ArrayBuffer;
  credentialUpload: File;
  credentialTemp: string | ArrayBuffer;
  municipalitys: Municipality[] = [];
  month: any[];

  constructor( private fb: FormBuilder,
               private signupService: SignupService,
               private userService: UserService,
               private router: Router ) {

    this.user = this.userService.getUserAuth();
    this.token = this.userService.getToken();
    this.month = this.signupService.getMonths();
    this.crearFormulario();
  }

  imageSelected( file: File ) {

    if( !file ) {
      this.imageUpload = null;
      return;
    }

    if( file.type.match(/image\/*/) == null ){
      swal('Tipo de archivo no admitido!', 'Por favor sólo seleccione imágenes\nTipos admitidos: png, jpg, gif, jpeg.', 'warning');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };
  }


  credentialSelected( file: File ) {

    if( !file ) {
      this.credentialUpload = null;
      return;
    }

    if( file.type.match(/image\/*/) == null ){
      swal('Tipo de archivo no admitido!', 'Por favor sólo seleccione imágenes\nTipos admitidos: png, jpg, gif, jpeg.', 'warning');
      this.credentialUpload = null;
      return;
    }

    this.credentialUpload = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.credentialTemp = reader.result;
    };
  }

  uploadImage() {
    this.userService.changePhotography(this.imageUpload);
  }

  uploadCredential() {
    this.userService.uploadCredential(this.credentialUpload);
  }

  ngOnInit(): void {
    this.signupService.getMunicipalitys()
      .subscribe(muni => this.municipalitys = muni);
    }

  crearFormulario(){
    
    this.form = this.fb.group({
    name: [this.user.name, [ Validators.required, Validators.minLength(3) ], ],
    last_name: [this.user?.last_name || ''],
    email: [this.user?.email || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    domicile: this.fb.group({
      street: [ this.user?.domicile?.street || '' ],
      number: [this.user?.domicile?.number || ''],
      colony: [this.user?.domicile?.colony || ''],
      municipality: [this.user?.domicile?.municipality || ''],
      country: [this.user?.domicile?.country || '']
    }),
    nacionality: [this.user?.nacionality || ''],
    gender: [this.user?.gender || ''],
    date_birth: [this.user?.date_birth || undefined],
    speciality: [this.user?.speciality || '', [ Validators.minLength(5) ]],
    professional_titles: [this.user?.professional_titles || ''],
    last_job: [this.user?.last_job || ''],
    description: [this.user?.description || ''],
    whatsapp: [this.user?.whatsapp || ''],
    movil_phone: [this.user?.movil_phone || ''],
    telephone: [this.user?.telephone || ''],
    facebook: [this.user?.facebook || ''],
    twitter: [this.user?.twitter || ''],
    instagram: [this.user?.instagram || ''],
    youtube_channel: [this.user?.youtube_channel || ''],
    blog_personal: [this.user?.blog_personal || ''],
    page_web: [this.user?.page_web || ''],
    location: ['0']
    });
  }


  send(){
    
    if ( this.form.invalid ) {
      this.form.get('name').markAsTouched();
      this.form.get('last_name').markAsTouched();
      this.form.get('email').markAsTouched();
      
      swal('Datos inválidos', 'Revise que la información ingresada sea correcta por favor.', 'warning');

      return;
    }

    let data = {
      ...this.user,
      ...this.form.value
    };
  
    this.userService.updateUser(data).subscribe();
  /* this.form.reset(); */
  }

  establecerSexo(gender: string) {
    this.form.get('gender');
    this.form.get('gender').setValue(gender);
  }
  habilitarCampoSexo() {
    this.especificarSexo = true;
    this.form.get('gender').setValue('');
    this.form.get('gender').enable();
  }

  verificarInvalidez(dato: string): boolean {
    return (this.form.get(dato).invalid && this.form.get(dato).touched) || this.form.get(dato).value?.trim() === '';
  }

  verificarValidez(dato: string): boolean {
    return this.form.get(dato).valid && this.form.get(dato).touched;
  }
  verificarRuta(): boolean{
    const ruta: string = this.router.url;
    return ruta.indexOf( 'signup/platino' ) >= 0 ? true : false ;
    }
}
