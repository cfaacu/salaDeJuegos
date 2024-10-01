import { Usuario } from "./usuario";

export class Mensaje {
    usuario!: Usuario | undefined;
    hora!: string;
    mensaje!: string;
}