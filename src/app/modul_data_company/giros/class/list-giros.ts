import { Girosinferface } from '../model/giro-interface';

export class ListaClass {

    private lista: Girosinferface[] = [];
    constructor() {
    }
    additem(item) {
        let temp;
        if (item['Principal'] === '1') {
            if (this.lista.length === 0) {
                this.lista.push(item);
            } else {
                temp = this.lista[0];
                this.lista[0] = item;
                this.lista.push(temp);
            }
        } else {
            this.lista.push(item);
        }
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.giron1.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.lista;
    }
    public clearlist() {
        this.lista = [];
    }
    public GetCertification(id) {
        let datos: any = [];
        this.lista.forEach(norma => {
            if (id === norma.IDGE) {
                datos = norma;
                return;
            }
        });
        return datos;
    }
}