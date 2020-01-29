import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { note } from '../modelo/note';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { Toast } from '../utilities/Toast';
import { Loading } from '../utilities/Loading';
import { NavController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public listadoPanel;
  //Lo que le pasas al modal
  @Input() id: string;
  @Input() misDatos:note;
  
  public todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoS: TodoservicioService,
    private myLoading: Loading, public myToast:Toast, private nav:NavController, private modalCtrl:ModalController,
    navParams:NavParams) {
      this.id = navParams.get('id');
      this.misDatos = navParams.get('note');
  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [this.misDatos.title, Validators.required],
      description: [this.misDatos.description]
    });
  }

  editNote() {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    }
    this.myLoading.presentLoading();
    //esto devuelve una promesa y en ve de crear una variable de por medio para el then y el catch, lo hacemos del tirón
    this.todoS.updateTODO(this.id,data)
    .then((ok)=>{
      this.todoForm.reset();
      this.myToast.presentToast("Nota editada", 'success');
    })
    .catch((err)=>{
      this.myToast.presentToast("Error", 'danger', 4000);
    })
    .finally(()=>{
      //esta es comun al then y al catch por eso cerraremos aqui el loading
      this.myLoading.cerrar();
      this.modalCtrl.dismiss();
    })
    //Fin.
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
}
