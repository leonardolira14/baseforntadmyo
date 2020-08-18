import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate'
})
export class FormatLinksPipe implements PipeTransform {

    transform(value: any) {
        if (value === '-') {
            return '-';
        }
        const fecha = new Date(value);
        let day_: any;
        let month_: any;
        (fecha.getDay() < 10) ? day_ = '0' + fecha.getDay() : day_ = fecha.getDay();
        (fecha.getMonth() < 10) ? month_ = '0' + (fecha.getMonth() + 1) : month_ = fecha.getMonth();
        const retun_value = day_ + '/' + month_ + '/' + fecha.getFullYear();
        return retun_value;
    }

}


