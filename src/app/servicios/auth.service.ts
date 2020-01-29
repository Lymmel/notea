import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../modelo/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variable para ver si el usuario esta logeado o no.  
  public isLogged: any = false;

  constructor(public afMyAuth: AngularFireAuth) {
    //En caso de que no haya ningún usuario logeado devuelve un null.
    afMyAuth.authState.subscribe(user => (this.isLogged = user));
  }

  //Login
  async onLogin(user:User) {
    try {
      return await this.afMyAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    }catch (error){
      console.log('Error al logear', error);
    }
  }


  //Register
  async onRegister(user:User){
    try{
      return await this.afMyAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    }catch(error){
      console.log('Error al registrar usuario', error);
    }
  }
}
