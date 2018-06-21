import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DesplazamientoService {
    private subject: Subject<Desplazamiento> = new Subject<Desplazamiento>();

    sendDesplazamiento(x: number, y: number) {
        this.subject.next({ 'x': x, 'y' : y });
    }

    getDesplazamiento(): Observable<Desplazamiento> {
        return this.subject.asObservable();
    }
}

class Desplazamiento {
	x: number;
	y: number;
}