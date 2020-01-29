import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { note } from '../modelo/note';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { Toast } from '../utilities/Toast';
import { Loading } from '../utilities/Loading';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoS: TodoservicioService,
    private myLoading: Loading, public myToast:Toast) {

  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  addNote() {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    }
    this.myLoading.presentLoading();

    //esto devuelve una promesa y en ve de crear una variable de por medio para el then y el catch, lo hacemos del tirón
    this.todoS.addTODO(data)
    .then((ok)=>{
      this.todoForm.reset();
      this.myToast.presentToast("Nota agregada", 'success');
    })
    .catch((err)=>{
      this.myToast.presentToast("Error", 'danger', 4000);
    })
    .finally(()=>{
      //esta es comun al then y al catch por eso cerraremos aqui el loading
      this.myLoading.cerrar();
    })
    //Fin.
  }

  

 

}
