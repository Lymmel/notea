import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { User } from '../modelo/User';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user: User=new User();
  constructor(private myAuthService:AuthService, private myRouter:Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.myAuthService.onRegister(this.user);
    //aqui comprabamos si tenemos un user, si ha ocurrido algo nos devolvería un null, si ha ido bien nos da el usuario
    if(user){
      console.log('Usuario creado correctamente');
      this.myRouter.navigateByUrl('/tabs/tab3');
    }
  }

}
