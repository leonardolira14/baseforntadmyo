import { Categoria } from './format';

export class ListCategoria {
    private lista_categoria: Categoria[] = [];

    constructor(
    ) { }

    public add_medicamento(categoria: Categoria) {
        this.lista_categoria.push(categoria);
    }
    public limpiarlista() {
        this.lista_categoria = [];
    }
    public getlista() {
        return this.lista_categoria;
    }
    public filtro(numeroMedia: string) {
        let categorias_me: any = [];
        if (numeroMedia === 'baja') {
            categorias_me = this.lista_categoria.filter(categoria => categoria.Media < 6.0);
        }
        if (numeroMedia === 'media') {
            categorias_me = this.lista_categoria.find(categoria => categoria.Media >= 6.0 && categoria.Media <= 8.0);
        }
        if (numeroMedia === 'mayor') {
            categorias_me = this.lista_categoria.filter(categoria => categoria.Media > 8.1);
        }
        console.log(categorias_me);
        return categorias_me;
    }
};