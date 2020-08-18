import { Userinterfas } from '../models/user-interface';

export class List{
    private lista: Userinterfas[] = [];

    constructor() {

    }
    public additem(IDUsuario, Nombre, Apellidos, Visible, Tipo_Usuario, IDEmpresa, Correo, Imagen, Status, Puesto) {
        this.lista.push({ IDUsuario, Nombre, Apellidos, Visible, Tipo_Usuario, IDEmpresa, Correo, Imagen, Status, Puesto });
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.Nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.lista;
    }
    public clearlist() {
        this.lista = [];
    }
    public GetMarca(id) {
        console.log(this.lista, id);
        let datos: any = [];
        this.lista.forEach(norma => {
            if (id === norma.IDUsuario) {
                datos = norma;
                return;
            }
        });
        return datos;
    }
}