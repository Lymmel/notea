import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { User } from '../modelo/User';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: User=new User();
  constructor(private myRouter:Router, private myAuthService: AuthService) {

  }

  ngOnInit(){}

  async onLogin(){
    const user = await this.myAuthService.onLogin(this.user);
    if (user){
      console.log('Logeado correctamente!');
      this.myRouter.navigateByUrl('/tabs/tab2');
    }
  }

}
