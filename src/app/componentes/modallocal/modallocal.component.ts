import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { HelpI } from 'src/app/models';

@Component({
  selector: 'app-modallocal',
  templateUrl: './modallocal.component.html',
  styleUrls: ['./modallocal.component.scss'],
})
export class ModallocalComponent implements OnInit {

  @Input() detalle:HelpI;
  
  constructor(private modal:ModalController, public database:DataBaseService) { }

  ngOnInit() {
    this.getDetalles;
  }

  cerrar(){
    this.modal.dismiss();
  }

  getDetalles(){
    
  }





}
