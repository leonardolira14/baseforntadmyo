import { Asociacioninterface } from '../models/asociation-interface';
export class ListaClass {

    private lista: Asociacioninterface[] = [];

    constructor() {

    }
    public additem(item) {
        this.lista.push(item);
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.Asociacion[0].Nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
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
