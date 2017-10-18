export class FileItem {
    public archivo: File;
    public nombreArchivo: string;
    public url = '';
    public estaSubiendo = false;
    public progreso = 0;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
    }
// tslint:disable-next-line:eofline
}