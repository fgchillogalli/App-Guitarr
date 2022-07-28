import { Component, Input, OnInit } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { ModalController } from '@ionic/angular';
import { ModallocalComponent } from 'src/app/componentes/modallocal/modallocal.component';
import { TtsService } from 'src/app/services/tts.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { HelpI, RequestPromedioApiI, responsePromedioApiI } from 'src/app/models';
import { DataBaseService } from 'src/app/services/data-base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Input()  Prueba = "Hola";

  detalle: HelpI[];
  respuesta: responsePromedioApiI;
  data: RequestPromedioApiI = {
    nombre: null,
    nota1: null,
    nota2: null,
    nota3: null

  }



  constructor(public modalController: ModalController,
    private stts: TtsService,
    public dataBase: DataBaseService,
    private http: HttpClient

  ) {

  }

  async ngOnInit() {
    let hasPermission = await SpeechRecognition.hasPermission();
    if (!hasPermission.permission) {
      SpeechRecognition.requestPermission();
    }
  }

  async help() {
    const modal = await this.modalController.create({
      component: ModallocalComponent,

      mode: 'ios',
      swipeToClose: true
    });
    await modal.present();
  }

  speak(esp: string) {
    this.stts.discurso(esp);
  }

  promediar() {
    const url = 'http://localhost:5001/worldguitarbraille/us-central1/promedio';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<responsePromedioApiI>(url, this.data, httpOptions).subscribe(res => {
      console.log('recibo respuesta del servidor ->', res);
      this.respuesta = res;
      return

    })
  }

  promediarCliente() {
    const data = this.data;
    var suma = (data.nota1 + data.nota2 + data.nota3) / 3;
    if (suma > 70) {
      this.respuesta = {
        nombre: data.nombre,
        promedio: suma,
        nota: 'Aprovo el ciclo',
      }
    } else {
      this.respuesta = {
        nombre: data.nombre,
        promedio: suma,
        nota: 'Reprobo el ciclo',
      }
    }
  }


}




