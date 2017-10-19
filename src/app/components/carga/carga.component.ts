import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { FileItem } from './../../models/file-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent {

  estaSobreDropZone = false;
  permiteCargar = true;
  archivos: FileItem[]= [];

  constructor(public _cargarImagenes: CargaImagenesService) { }


  archivoSobreDropZone(e: boolean) {
    this.estaSobreDropZone = e;
  }

  cargarImagenesFirebase() {
    this.permiteCargar = false;
    this._cargarImagenes.cargar_imagenes_firebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
    this.permiteCargar = true;
  }

}
