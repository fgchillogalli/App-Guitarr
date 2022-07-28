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

  estLed: boolean = false;
  version = 0;
  lecciones: any[] = [];


  constructor( private realtimedb: RealtimedbService,
    private fireStorage: FirestorageService) {
    
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

  bienvenida(){
    this.lecciones.forEach(leccion =>{
      leccion.pause();
    });
    const music = new Audio('https://firebasestorage.googleapis.com/v0/b/worldguitarbraille.appspot.com/o/Leccion1.m4a?alt=media&token=666db67a-024d-41db-ba6b-31c361ff65ae');
    music.play();
    console.log('Estoy en Audio');
    music.loop =false;
    music.playbackRate = 1;
    this.lecciones.push(music);
  }

  leccion(){
    this.lecciones.forEach(leccion =>{
       leccion.pause();
    });
    const music = new Audio('assets/audio/Leccion1.m4a');
    music.play();
    console.log('Estoy en Audio');
    music.loop =false;
    music.playbackRate = 1;
    this.lecciones.push(music);
  
  }

  

}
