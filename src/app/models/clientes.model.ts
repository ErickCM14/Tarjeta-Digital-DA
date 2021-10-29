export class ClientesModel{
    id?: string;
    nombre: string;
    phone: number;
    email: string;
    pass: any;
    visita:{
        contador: number,
        fecha: any
    }
}