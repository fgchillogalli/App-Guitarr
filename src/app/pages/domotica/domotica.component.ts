import { Component, OnInit } from '@angular/core';
import { CuponI } from 'src/app/models';


@Component({
  selector: 'app-domotica',
  templateUrl: './domotica.component.html',
  styleUrls: ['./domotica.component.scss'],
})
export class DomoticaComponent implements OnInit {

  cupon: String[] = [];
  newCupon: String;
  cuponC: String;
  valido = null;
  
  constructor() { 
  }

  ngOnInit() {}

  addCupon(){
    this.cupon.push(this.newCupon);

  }


  canjear(){
    this.valido = 'no existe';
    this.cupon.forEach(cuponC => {
      if (cuponC == this.cuponC){
        this.valido = 'existe';
      }
    })
  }

}
