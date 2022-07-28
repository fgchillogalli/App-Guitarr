import { Component, OnInit} from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  texto: "abrir menu";
  

  constructor() {
    
  }

  ngOnInit() {
    
  }

  abrirMenu(){
    if (this.texto.search("menu")){
      
    }
  }


  public async start(){
    SpeechRecognition.start({
      language: "es-Es",
      maxResults: 2,
      prompt: "Que deceas hacer",
      partialResults: true,
      popup: false,
    });
    
    SpeechRecognition.addListener("partialResults", (data: any) => {
      console.log("partialResults was fired", data);
    });
  }
}
