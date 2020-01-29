import { Component } from '@angular/core';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Loading } from '../utilities/Loading';
import { Alert } from '../utilities/Alert';
import { Toast } from '../utilities/Toast';
import { AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';
import { ModalPage } from '../modal/modal.page';
import { note } from '../modelo/note'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public listadoPanel;
  dato1:string;
  dato2:string;
  public textoBuscar = '';
  constructor(private todoS: TodoservicioService, private myLoading: Loading,
    private router: Router, private myAlert: Alert, public myToast:Toast,
    private myAuthService:AuthService, private afMyAuth: AngularFireAuth,
    public modalCtrl: ModalController) {

  }


  ngOnInit() {
    this.refrescar();
  }

  ionViewDidEnter() {
  }

  public borraNota(id: string) {
    console.log("BORRANDO...");
    this.myAlert.presentAlert().then((success:boolean) =>{
      if(success){
        this.todoS.deleteTODO(id).then((salida) => {
          this.refrescar();
          this.myToast.presentToast("Nota borrada correctamente", 'success');
        }).catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) =>{
      console.log(err);
    })
  }

  public buscar(event) {
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }

  private async refrescar() {
    await this.myLoading.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando notas...");
    try {
      this.todoS.readTODO2().subscribe((listado) => {
        this.listadoPanel = listado;
        this.myLoading.cerrar();
      },
        error => {

        });
    } catch (err) {
      this.myLoading.cerrar();
    }
    console.log("Solicitada la petición");
  }


  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando notas...");
    this.todoS.readTODO2().subscribe((listado) => {
      this.listadoPanel = listado;
      this.myLoading.cerrar();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }

  public irNueva(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  
  //this.todoForm.get('title').value
  editaNota(id: string) {
    /*
    this.dato1;
    this.dato2;

    this.todoS.updateTODO(id, )
    */
  }

  async presentModal(id:string, misDatos:note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps:{
        'id': id,
        'note': misDatos
      }
    });
    return await modal.present();
  }

  onLogout(){
    console.log('Desconectado!');
    this.afMyAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/tab1');
  }

}
