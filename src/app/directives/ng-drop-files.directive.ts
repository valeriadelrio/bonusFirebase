import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();

  constructor(public elemento: ElementRef) { }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.archivoSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.archivoSobre.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    // tslint:disable-next-line:prefer-const
    let transferencia = this._getTransferencia(event);
    transferencia.dropEffect = 'copy';
    this._prevenirYdetener(event);
    this.archivoSobre.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    // tslint:disable-next-line:prefer-const
    let transferencia = this._getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this._agregarArchivos(transferencia.files);
    this._prevenirYdetener(event);
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos(archivosLista: FileList) {

  }

  private _prevenirYdetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoPuedeSerCargado(archivo: File) {
    if (this._archivoYaFueDroppeado(archivo.name) && (this._esImagen(archivo.type))) {
      return true;
    }
    return false;
  }

  private _archivoYaFueDroppeado(nombreArchivo: string): boolean {
    for (let index = 0; index < this.archivos.length; index++) {
      // tslint:disable-next-line:prefer-const
      let arch = this.archivos[index];
      if (arch.archivo.name === nombreArchivo) {
        console.log('Archivo ya existe en la lista', nombreArchivo);
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }
}
