import { by } from 'protractor';
import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable,   } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import * as firebase from 'firebase';

@Injectable()
export class CargaImagenesService {

  private  CARPETA_IMAGENES = 'img';
  constructor(public afd: AngularFireDatabase) {}

  listaUltimasImagenes( numeroImagenes: number): FirebaseListObservable < any[] > {
    return this.afd.list(`/${ this.CARPETA_IMAGENES }`, {
      query: {
        limitToLast: numeroImagenes
      }
    });
  }

  cargar_imagenes_firebase (archivos: FileItem[]) {
    console.log(archivos);
    const storageRef = firebase.storage().ref();
    // tslint:disable-next-line:prefer-const
    for (let item of archivos) {
      item.estaSubiendo = true;
      const uploadTask: firebase.storage.UploadTask =
                storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = ( uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes  ) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;
          this.guardarImagen({nombre: item.nombreArchivo, url: item.url});
        }
      );
    }
  }

  private guardarImagen( imagen: any) {
    this.afd.list(`/${this.CARPETA_IMAGENES}`).push(imagen);
  }

}
