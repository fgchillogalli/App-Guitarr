import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.scss'],
})
export class PaginaWebComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) { 
    this.activeRoute.params.subscribe(res =>{
      console.log('params -> ', res);
      
    })
  }

  ngOnInit() {}

}
