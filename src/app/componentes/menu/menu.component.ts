import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { userI } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;
  rol: 'usuario' | 'admin' = null;

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private router: Router,
    private firestore: DataBaseService) {

      this.auth.stateUser().subscribe(res => {
        if (res){
          console.log('Esta Logeado');
          this.login = true;
          this.getDatosUser(res.uid)
        } else {
          console.log('No esta Logeado');
          this.login = false;
          
        }
      })

    }

  ngOnInit() {}

  loginApp(){
    this.login = true;
  }

  logout(){
    this.auth.logout();
    this.interaction.presentToast('Sesion Cerrada Con Exito');
    this.router.navigate(['/logins'])
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<userI>(path, id).subscribe(res => {
      console.log('datos -> ', res);
      if (res){
        this.rol = res.perfil
      }
    })

  }
}
