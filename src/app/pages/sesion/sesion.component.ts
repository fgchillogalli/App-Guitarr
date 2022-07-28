import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { credencialesI } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {

  credenciales: credencialesI = {
    correo: null,
    password: null 
  };

  constructor(private auth: AuthService, 
    private interaction: InteractionService,
    private router: Router ) { }

  ngOnInit() {}

  async login(){
    await this.interaction.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch ( error => {
      console.log('error');
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario o Contraseña Invalidos')
    })

    if (res){
      console.log('res -> ', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Bienvenido.!!')
      this.router.navigate(['/home'])
    }
  } 

} 
