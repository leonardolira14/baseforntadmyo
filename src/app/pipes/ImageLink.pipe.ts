import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
    name: 'formatImageUrlP'
})
export class FormatImageUrlPipe implements PipeTransform {

    transform(value: string) {
        let cadena = 'assets/img/foto-no-disponible.jpg';
        if (value === '') {
            cadena = environment.url_serve + 'assets/img/logosEmpresas/' + value;
        }
        return cadena;
    }

}