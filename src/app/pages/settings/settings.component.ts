import { DataBaseService } from './../../services/data-base.service';
import { userI } from './../../models';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DatosI } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  uid: string;
  
  user: userI = {
    nombre: null,
    edad: null,
    correo: null,
    password: null,
    uid: null,
    perfil: null,
  }

  newDatos: DatosI = {
    idDatos: null,
    leccion: null,
    imagen: null,
    audio: null,
  }

  newAudio = '';
  newImage = '';

  constructor(private storageService: FirestorageService,
              private authService: AuthService,
              private dataBaseService: DataBaseService) {
                this.authService.stateUser().subscribe( res => {
                  if (res) {
                    this.uid = res.uid;
                    console.log( 'desde settings', res);
                  }
                  
                })
              }

  ngOnInit() {}

  async saveDatos(){
    const idDatos = this.dataBaseService.getId();
    const path = 'Usuarios/' + this.uid + '/Datos';
    const data = this.newDatos;
    data.idDatos = idDatos;
    console.log(data);
    
    const pathImage = 'Imagenes';
    const nameImage = this.newDatos.leccion;
    if (this.newImage !== undefined) {
      const res = await this.storageService.uploadImage(this.newImage, pathImage, nameImage);
      this.newDatos.imagen = res;
    }

    const pathAudio = 'Audios';
    const nameAudio = this.newDatos.leccion;
    if (this.newAudio !== undefined) {
      const res = await this.storageService.uploadAudio(this.newAudio, pathAudio, nameAudio);
      this.newDatos.audio = res;
    }
    
    this.dataBaseService.createDoc(data, path, idDatos).then( res => {
      console.log('Datos guardados', res);
      
    })

  }
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
          this.newDatos.imagen = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async newAudioUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newAudio = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((audio) => {
          this.newDatos.audio = audio.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }


}
