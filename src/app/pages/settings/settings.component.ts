import { Component, OnInit } from '@angular/core';
import { DatosI } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  audio = "";
  newDatos: DatosI = {
    leccion: null,
    imagen: null,
    audio: null,
  }

  constructor(private storageService: FirestorageService) { }

  ngOnInit() {}

  async saveAudio(){
    /*const path = 'Audios';
    const name = 'Prueba';
    const file = event.target.files[0];
    const res = this.storageService.subirAudio(file, path, name);
    console.log('recivi la promesa', res);
    console.log('Fin de la funcion');*/

    const path = 'Audios';
    const name = this.newDatos.leccion;
    if (this.audio !== undefined){
      const res = await this.storageService.subirAudio(this.audio, path, name);
      this.newDatos.audio = res;
      console.log('respuesta save', res);
      
    }

  }
  

  async updateAudio(event: any){
    if (event.target.files && event.target.files[0]){
      this.audio = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((audio) =>{
        this.newDatos.audio = audio.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
