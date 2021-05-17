export class Categoria {
    public IDPregunta: string;
    public Forma: string;
    public Pregunta: string;

    public GraphisRs: object;
    public evolucion: object;
    public TotalCalificaciones: number;
    public Media: number;
}

export class Calificaciones{
    public IDValora: string;
    public num_empresa_receptora: string;
    public Logo: string;
    public Nombre_comer: string;
    public Razon_Social: string;
    public UsuarioReceptor: string;
    public CorreoReceptor: string;
    public UsuarioEmisor: string;
    public CorreoEmisor: string;
    public Status: string;
    public Fecha: string;
    public FechaModificacion: string;
    public FechaPuesta: string;
    public Media: number;
}
