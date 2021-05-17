import { Marcainferface } from '../model/marca-interface';

export class ListaClass {

    private lista: Marcainferface[] = [];

    constructor() {

    }
    public additem(item) {
        this.lista.push(item);
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.Marca.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.lista;
    }
    public clearlist() {
        this.lista = [];
    }
    public GetMarca(id) {
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