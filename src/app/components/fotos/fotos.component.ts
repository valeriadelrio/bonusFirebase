import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  imagenes: FirebaseListObservable<any[]>;

  constructor(public _cis: CargaImagenesService) {
    this.imagenes = this._cis.listaUltimasImagenes(10);
   }

  ngOnInit() {
  }

}
