import { Userinterfas } from '../models/user-interface';

export class List{
    private lista: Userinterfas[] = [];

    constructor() {

    }
    public additem(id, Nombre, Apellidos, Visible, Tipo_Usuario, Correo, Logo, Status, Puesto) {
        this.lista.push({ id, Nombre, Apellidos, Visible, Tipo_Usuario, Correo, Logo, Status, Puesto });
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
            if (id === norma.id) {
                datos = norma;
                return;
            }
        });
        return datos;
    }
}