import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { userI } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase: AngularFireAuth) { }

  login (correo: string, password: string){
    return this.authfirebase.signInWithEmailAndPassword(correo, password)
  }

  logout (){
    this.authfirebase.signOut();
  }

  registrarUser(datos: userI){
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  stateUser(){
    return this.authfirebase.authState
  }

  async getUid(){
    const user = await this.authfirebase.currentUser;
    if(user){
      return user.uid;
    } else {
      return null;
    }
  }
}
