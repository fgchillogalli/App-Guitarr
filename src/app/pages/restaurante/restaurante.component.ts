import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss'],
})
export class RestauranteComponent implements OnInit {

  mesa: String[] = [];
  newMesa: String;
  total: number = 0;

  constructor() { }

  ngOnInit() {}

  addMesa(){
    const mesa = this.newMesa;
    this.mesa.push(mesa);
    this.resetMesa();  
  }

  resetMesa(){
    this.newMesa = ""
  }

  borrar(i : number){
    this.mesa.splice(i, 1)
  }

}
