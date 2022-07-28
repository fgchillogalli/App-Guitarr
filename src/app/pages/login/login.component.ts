import { Component, OnInit } from '@angular/core';
import { LoginI } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  secion: LoginI[];
  

  constructor() { }
  ngOnInit() {}
  openMenu(){}


}
