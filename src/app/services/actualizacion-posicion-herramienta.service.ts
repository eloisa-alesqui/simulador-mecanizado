import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActualizacionPosicionHerramientaService {
    private subject = new Subject<any>();

    sendActualizacionPosicionHerramienta(x: number, z: number) {
        this.subject.next({ 'x': x, 'z' : z });
    }

    getActualizacionPosicionHerramienta(): Observable<any> {
        return this.subject.asObservable();
    }
}