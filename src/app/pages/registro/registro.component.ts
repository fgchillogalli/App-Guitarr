import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userI } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  datos: userI ={
    nombre: null,
    edad: null,
    correo: null,
    password: null,
    uid: null,
    perfil: 'usuario',
  }

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private firestore: DataBaseService,
    private router: Router) { }

  ngOnInit() {}

  async registrar(){
    await this.interaction.presentLoading('Creando Usuario...')
    console.log('datos -> ', this.datos);
    const res = await this.auth.registrarUser(this.datos).catch (error => {
      console.log('error', error);
      this.interaction.closeLoading();
      this.interaction.presentToast('Error al Crear Nuevo Usuario')
      
    })

    if(res){
      console.log('exito al crear usuario');
      
      const path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      await this.firestore.createDoc(this.datos, path, id);
      
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario Creado Con Exito');
      this.router.navigate(['/home'])
    }
  }

}
