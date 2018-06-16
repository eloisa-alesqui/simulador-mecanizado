import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DesplazamientoService {
    private subject = new Subject<any>();

    sendDesplazamiento(x: number, y: number) {
        this.subject.next({ 'x': x, 'y' : y });
    }

    getDesplazamiento(): Observable<any> {
        return this.subject.asObservable();
    }
}