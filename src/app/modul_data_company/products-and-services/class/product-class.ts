import { Productointerface } from '../model/product-interface';

export class Lista {
    lista: Productointerface[] = [];
    constructor() {
        
    }
    public additem(item) {
        this.lista.push(item);
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.Producto.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
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