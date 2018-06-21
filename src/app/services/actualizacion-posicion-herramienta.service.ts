import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActualizacionPosicionHerramientaService {
    private subject: Subject<PosicionHerramienta> = new Subject<PosicionHerramienta>();

    sendActualizacionPosicionHerramienta(x: number, z: number) {
        this.subject.next({ 'x': x, 'z' : z });
    }

    getActualizacionPosicionHerramienta(): Observable<PosicionHerramienta> {
        return this.subject.asObservable();
    }
}

class PosicionHerramienta {
	x: number;
	z: number;
}