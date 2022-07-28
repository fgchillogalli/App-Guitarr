import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root'
})
export class TtsService {


  constructor(private tts:TextToSpeech) { }

  discurso(texto:string){
    this.tts.speak({
      text: texto,
      locale:'es-ES',
      rate:1
    }).then(()=> console.log("funciona")
    ).catch((resp:any )=> console.error(resp));

  }
}
