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
  }

  private guardarImagen( imagen: any) {
    this.afd.list(`/${this.CARPETA_IMAGENES}`).push(imagen);
  }

}
