import { Injectable } from '@nestjs/common';
import *as fs from 'fs';
import { Pista } from './pista';


@Injectable()
export class PistaService {

    private static readonly CANTIDAD_PISTAS = 10;
    public getLista(): Pista[] {
        return this.listaPistas;
    }

    public getListaPistas(): any {
        return this.listaPistas
    }

    private listaPistas: Pista[] = [];
    datos: any;
    constructor() {
        this.loadPistas()
    }
    private loadPistas(): void {
        let archivo = fs.readFileSync('./src/pista/pistas.csv', 'utf8');
        let datos = archivo.split('\n').map(p => p.replace('\r', '')).map(p => p.split(','));
        this.listaPistas = [];
        for (let i = 0; i < datos.length; i++) {
            let pista = new Pista(parseInt(datos[i][0]), datos[i][1], parseInt(datos[i][2]), datos[i][3]);
            this.listaPistas.push(pista);
        }
    }
    public getPistaCSV(id: number): Pista {
        let resultado = this.listaPistas.find(pista => pista.identificador == id);
        return resultado

    }

    public addPista(pista: any): string {
        let nuevaPista = new Pista(pista.identificador, pista.titulo, pista.duracion, pista.interprete)
        if (nuevaPista.identificador != null && nuevaPista.titulo != null && nuevaPista.duracion != null && nuevaPista.interprete) {
            this.listaPistas.push(nuevaPista)
            this.cargarCSV(nuevaPista)
            return "ok"
        } else {
            return "Parámetro Incorrecto"
        }
    }

    private cargarCSV(pista: Pista): void {
        fs.appendFileSync('./src/pista/pistas.csv', `\n${pista.identificador},${pista.titulo},${pista.duracion},${pista.interprete}`); {

        }
    }

    public getPista(id: number): Pista {
        this.listaPistas.forEach(pista => {
            if (pista.identificador == id) {
            }
        });
        return null

    }

    public lanzamiento() {
        Math.floor(Math.random() * (2022 + 1970 + 1) + 1970)
    }
    public getPistas(): Pista[] {
        let listaPistas = [];
        for (let i = 0; i < PistaService.CANTIDAD_PISTAS; i++) {
            let pista = {
                'identificador': i,
                'titulo': `titulo ${i}`,
                'duracion': Math.floor(Math.random() * 300),
                'interprete': `interprete ${Math.floor(Math.random() * 3)}`,
                'lanzamiento': Math.floor(Math.random() * 2023)
            };
            listaPistas.push(pista);
        }
        return this.listaPistas;

    }

    public deletePista(posicion: number): string {
        let resultado = this.listaPistas.filter((pista) => pista.identificador != posicion,);
        if (resultado.length != this.listaPistas.length) {
            this.listaPistas = resultado
            this.reescribirCVS();
            return "ok"
        } else {
            return 'error 404 not found'
        }
    }

    public reescribirCVS() {
        fs.writeFile('./src/pista/pistas.cvs', '', function () {
            console.log('');
        });
        this.listaPistas.forEach((pista) => {
            fs.appendFileSync('./src/pista/pistas.cvs', `${pista.identificador},${pista.titulo},${pista.duracion},${pista.interprete}\n`,);
        });
    }

    public updatePista(id: number, nuevaPista: any): string {
        let pista = new Pista(nuevaPista.identificador, nuevaPista.titulo, nuevaPista.duracion, nuevaPista.interprete);
        if (pista.identificador != null && pista.titulo != null && pista.duracion != null && pista.interprete != null) {
            let index = this.listaPistas.findIndex((pista) => pista.identificador = id,);
            if (index != -1) {
                this.listaPistas[index] = pista;
                return 'ok';
            } else {
                return 'error 404';
            }
        } else {
            return 'parametro incorrecto'
        }

    }
}

