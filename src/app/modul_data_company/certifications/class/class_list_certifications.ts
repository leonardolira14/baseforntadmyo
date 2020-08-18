import { Certificationsinferface } from '../model/certifications-interface';

export class ListaClass {

    private lista: Certificationsinferface[] = [];
    constructor() {
    }
    additem(item) {
        this.lista.push(item);
    }
    public busquedapalabra(palabra) {
        return this.lista.filter(grupo => grupo.Norma.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
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
            if (id===norma.IDNorma) {
                datos = norma;
                return;
            }
        });
        return datos;
    }
}
