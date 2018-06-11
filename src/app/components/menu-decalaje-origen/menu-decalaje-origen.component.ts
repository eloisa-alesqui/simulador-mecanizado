import { Component, Output, EventEmitter } from '@angular/core';
import { DecalajeOrigenService } from '../../services/decalaje-origen.service';

@Component({
  selector: 'app-menu-decalaje-origen',
  templateUrl: './menu-decalaje-origen.component.html',
  styleUrls: ['./menu-decalaje-origen.component.less']
})
export class MenuDecalajeOrigenComponent {
	@Output() close: EventEmitter<String>;
	nuevoDecalajeOrigenX: number;
	nuevoDecalajeOrigenZ: number;

	constructor(private decalajeOrigenService : DecalajeOrigenService) {
		this.close  = new EventEmitter<String>();
	}

    aceptar() {
		this.decalajeOrigenService.cargarDecalajeOrigen(this.nuevoDecalajeOrigenX, this.nuevoDecalajeOrigenZ);
		this.close.emit();
    }

    cancelar() {
        this.close.emit();
    }
}
