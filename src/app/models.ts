 export interface UsuarioI {
    nombre: String;
    celular: String;
    correo: String;
    password: number
}

export interface LoginI{
    correo:String;
    contraseña:String
}

export interface CuponI{
    cupon: String;
}

export interface HelpI{
    detalles:string;
}

export interface responsePromedioApiI{
    nombre: string;
    promedio: number;
    nota: string;
}
export interface RequestPromedioApiI{
    nombre: string;
    nota1: number;
    nota2: number;
    nota3: number;
}

export interface credencialesI{
    correo: string;
    password: string;
}

export interface userI{
    nombre: string;
    edad: number;
    correo: string;
    password: string;
    uid: string;
    perfil: 'usuario' | 'admin'
}

export interface DatosI{
    idDatos: string;
    leccion: string;
    imagen: string;
    audio: string;
}