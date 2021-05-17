export interface Girosinferface {
    FechaAlta?:string;
    Giro?:{
        id?:string,
        Giro?:string
    };
    IDEmpresa?:string;
    Principal?:boolean;
    Rama?:{
        id?:string,
        Giro?:string
    };
    SubGiro?:{
        id?:string,
        Giro?:string
    };
    id?:string;
}