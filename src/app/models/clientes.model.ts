export class ClientesModel{
    id?: string;
    nombre: string;
    phone: number;
    email: string;
    password: string;
    visita:{
        contador: number,
        fecha: any
    }
}