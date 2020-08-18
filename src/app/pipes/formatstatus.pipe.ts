import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatStatus'
})

export class FormatStatusPipe implements PipeTransform {
    transform(value: string) {
        value = value.toLowerCase();
        if (value === 'pendiente' ) {
            return 'Cambio de valoración';
        } else if (value === 'pendientea')  {
            return 'Sin Relación Comercial';
        } else {
            return 'Activa';
       }
    }

 }
