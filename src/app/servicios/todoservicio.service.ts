import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { note } from '../modelo/note';

@Injectable({
  providedIn: 'root'
})
export class TodoservicioService {

  myCollection:AngularFirestoreCollection;

  constructor(private fireStore:AngularFirestore) { 
    this.myCollection=fireStore.collection<any>(environment.collection);
  }


  readTODO():Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

  readTODO2(timer:number=10000):Observable<note[]>{
    return new Observable((observer)=>{
      let subscripcion:Subscription;
      let tempo = setTimeout(() => {
        subscripcion.unsubscribe();
        observer.error("Timeout");
      },timer);
      subscripcion = this.readTODO().subscribe((lista) => {
        clearTimeout(tempo);
        let listado=[];
        lista.docs.forEach((nota) => {
          //este push nos da el id de la nota y cob los ... rellena con todos los campos de nota.
          listado.push({ id: nota.id, ...nota.data() });
        });
        observer.next(listado);
        observer.complete();
      })

    })
  }

  addTODO(mynote:note):Promise<firebase.firestore.DocumentReference>{
    return this.myCollection.add(mynote);
  }

  readTODOByID(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  updateTODO(id:string,data:note):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  deleteTODO(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

  /**
   * Tarea: read note where ....
   */
  readTODOByCriteria(){

  }


  
}
