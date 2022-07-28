import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { userI } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  uid: string = null;
  infoUser: userI = null;

  constructor(private auth: AuthService,
    private firestore: DataBaseService,
    public alertController: AlertController,
    private interaction: InteractionService) { }

  ngOnInit() {
    this.auth.stateUser().subscribe( res =>{
      console.log('En perfil estado autenticacion -> ', res);
      this.getUid();
    });
    this.getUid();  
  }

  async getUid(){
    const uid = await this.auth.getUid();
    if (uid){
      this.uid = uid;
      console.log('uid -> ', this.uid);  
      this.getInfoUser();
    } else {
      console.log('No existe uid');
      
    }
  }

  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid; 
    this.firestore.getDoc<userI>(path, id).subscribe(res => {
      if (res){
        this.infoUser = res;
      }
      console.log('los datos son -> ', res);
      
    })
  } 

  async updateDatos(name: string) {
    const alert = await this.alertController.create({
      header: 'Editar' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingresa tu ' + name
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (ev) => {
            console.log('Confirm Ok', ev);
            this.saveDatos(name, ev[name])
          }
        }
      ]
    });

    await alert.present();
  }

  async saveDatos (name: string, input: any){
    await this.interaction.presentLoading('Actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
    };
    updateDoc[name] = input;
    this.firestore.updateDoc(path, id, updateDoc).then(() => {
      this.interaction.presentToast('Actualizado Con Exito.!!')
      this.interaction.closeLoading();

    })
  }

}
