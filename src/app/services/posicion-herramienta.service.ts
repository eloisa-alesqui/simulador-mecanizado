import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PosicionHerramientaService {
    private x: number;
    private z: number;

    public cargarPosicionHerramienta(x: number, z: number): void {
        this.x = x;
        this.z = z;
    }

    public getX(): number {
        return this.x;
    }

    public getZ(): number {
        return this.z;
    }
}