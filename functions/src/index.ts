import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const cors = require('cors')({
    origin:true
});
export const promedio = functions.https.onRequest((request, response) => {

    return cors (request, response, async () =>{
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
        response.set('Access-Control-Allow-Headers', '*');

        const data = request.body as RequestProm;
        if (data.nombre != undefined && data.nota1 != undefined && data.nota2 != undefined && data.nota3 != undefined){ 
            var suma = (data.nota1 + data.nota2 + data.nota3) / 3;
            if (suma > 70){    
                const res: ResponseProm = {
                    nombre: data.nombre,
                    promedio: suma,
                    nota: "Paso el ciclo"
                }
                response.send(res)
            } else{
                const res: ResponseProm = {
                    nombre: data.nombre,
                    promedio: suma,
                    nota: "Perdio el ciclo"
                }
                response.send(res)
            }
        } else{
            const res: ResponseProm = {
                nombre: '',
                promedio: 0,
                nota: ''
            }
            response.send(res);
        }
    });
});

interface RequestProm{
    nombre: string;
    nota1: number;
    nota2: number;
    nota3: number;
}

interface ResponseProm{
    nombre: string;
    promedio: number;
    nota: string;
}