import { Calificaciones } from './format';


export class ListaCalificaciones {
    private lista_categoria: Calificaciones[] = [];

    constructor(
    ) { }

    public add_medicamento(categoria: Calificaciones) {
        this.lista_categoria.push(categoria);
    }
    public limpiarlista() {
        this.lista_categoria = [];
    }
    public getlista() {
        return this.lista_categoria;
    }
    public filtro(numeroMedia: string, ClienteID: string, FechaInicio: string, FechaFin: string, Estado: any) {
        let categorias_me: any = this.getlista();
        console.log(categorias_me);
        if (numeroMedia === 'baja') {
            categorias_me = categorias_me.filter(categoria => categoria.Media < 6.0);
        }

        if (numeroMedia === 'media') {
            categorias_me = categorias_me.filter(categoria => categoria.Media >= 6.0 && categoria.Media <= 8.0);
        }
        if (numeroMedia === 'mayor') {
            categorias_me = categorias_me.filter(categoria => categoria.Media > 8.1);
        }

        if (ClienteID !== '' && ClienteID !== 'td') {
            console.log(ClienteID);
            categorias_me = categorias_me.filter(categoria => categoria.num_empresa_receptora === ClienteID);
        }

        if (FechaInicio !== '') {

            categorias_me = categorias_me.filter(
                (item: any) => {
                    const fecha = new Date(item.Fecha);
                    const fehaInicio = new Date(FechaInicio + " 00:00:00");
                    const fehaFin = new Date(FechaFin + " 00:00:00");
                    console.log(fecha, fehaInicio, fehaFin);
                    // tslint:disable-next-line: no-unused-expression
                    return fecha.getTime() >= fehaInicio.getTime() && fecha.getTime() <= fehaFin.getTime();
                }
            );
            let hash = {};
            categorias_me = categorias_me.filter(o => hash[o.IDValora] ? false : hash[o.IDValora] = true);
        }
        if (Estado !== '') {
            categorias_me = categorias_me.filter(categoria => categoria.Status === Estado);
        }

        console.log(categorias_me);
        return categorias_me;
    }
};