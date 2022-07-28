import { DataBaseService } from 'src/app/services/data-base.service';
import { DatosI } from './../../models';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { RealtimedbService } from 'src/app/services/realtimedb.service';




@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {

  lecciones: DatosI [] = [];

  leccion: DatosI = {
    idDatos: null,
    leccion: null,
    imagen: null,
    audio: null,
  }

  estLed: boolean = false;
  version = 0;
  audioLecciones = [];


  constructor(  private realtimedb: RealtimedbService,
                private fireStorage: FirestorageService,
                private dataBaseService: DataBaseService,
                ) {

                this.loadDatos();
              }

  ngOnInit() {}

  async guardarLed(){
    let path = 'led'
    await this.realtimedb.createObjet(path, true);
    this.version = this.version + 1;
    path ='version';
    this.realtimedb.createObjet(path, this.version);
  }

 async apagarLed() {
    let path = 'led'
    await this.realtimedb.createObjet(path, false);
    this.version = this.version + 1;
    path ='version';
    this.realtimedb.createObjet(path, this.version)
 }

  getStateLed(){
    const path = 'state-led'
    this.realtimedb.getObjet(path).subscribe(res =>{
      this.estLed = res as any;
    })
  }

  loadDatos () {
    const path = 'Datos';
    this.dataBaseService.getSubcollection<DatosI>(path).subscribe( res => {
      console.log('data lesson: ', res);
      if (res.length) {
        this.lecciones = res;
      } else {
        this.lecciones = [];
      }
    })
  }

  playAudio(leccion: DatosI) {
    this.leccion = leccion;
    this.audioLecciones.forEach( leccion =>{
      leccion.pause();
    });
    const music = new Audio(this.leccion.audio);
    music.play();
    console.log('Estoy en Audio');
    music.loop =false;
    music.playbackRate = 1;
    this.audioLecciones.push(music);
  }

  // bienvenida(){
    
  //   this.audioLecciones.forEach(leccion =>{
  //     leccion.pause();
  //   });
  //   const music = new Audio('https://firebasestorage.googleapis.com/v0/b/worldguitarbraille.appspot.com/o/Leccion1.m4a?alt=media&token=666db67a-024d-41db-ba6b-31c361ff65ae');
  //   music.play();
  //   console.log('Estoy en Audio');
  //   music.loop =false;
  //   music.playbackRate = 1;
  //   this.audioLecciones.push(music);
  // }

  // leccion(){

  //   this.audioLecciones.forEach(leccion =>{
  //      leccion.pause();
  //   });
  //   const music = new Audio('assets/audio/Leccion1.m4a');
  //   music.play();
  //   console.log('Estoy en Audio');
  //   music.loop =false;
  //   music.playbackRate = 1;
  //   this.audioLecciones.push(music);
  
  // }
}
