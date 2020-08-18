import { NotificationInterface } from '../models/notification-interface';

export class NotificationClass {
    private lista: NotificationInterface[] = [];

    constructor() {
    }
    public additem(item) {
        this.lista.push(item);
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.Descript.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
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
            if (id === norma.IDNotificacion) {
                datos = norma;
                return;
            }
        });
        return datos;
    }
}