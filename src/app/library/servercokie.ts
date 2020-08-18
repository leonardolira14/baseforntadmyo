import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})

export class Serviecokie{

    constructor(
        private cokieServe: CookieService
    ) {

    }

    setCookie(name: string, value: any) {
        if (this.cokieServe.get(name)) {
            this.cokieServe.delete(name);
        }

        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 1);
        this.cokieServe.set(name, btoa(JSON.stringify(value)), expiredDate);
        return true;

    }

    getCokie(name: string) {
        if (this.cokieServe.get(name)) {
            return JSON.parse(atob(this.cokieServe.get(name)));
        }
        return false;
    }

    deleteCokie(name) {
        this.cokieServe.delete(name);
    }
    deleteAllCookie() {
        this.cokieServe.deleteAll();
    }

}
