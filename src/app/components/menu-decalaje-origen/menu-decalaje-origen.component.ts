import { Component, Output, EventEmitter } from '@angular/core';
import { DecalajeOrigenService } from '../../services/decalaje-origen.service';

@Component({
  selector: 'app-menu-decalaje-origen',
  templateUrl: './menu-decalaje-origen.component.html',
  styleUrls: ['./menu-decalaje-origen.component.less']
})
export class MenuDecalajeOrigenComponent {
	@Output() private close: EventEmitter<String>;
	private nuevoDecalajeOrigenX: number;
	private nuevoDecalajeOrigenZ: number;

	constructor(private decalajeOrigenService : DecalajeOrigenService) {
		this.close  = new EventEmitter<String>();
		this.nuevoDecalajeOrigenX = decalajeOrigenService.getDecalajeOrigenX();
		this.nuevoDecalajeOrigenZ = decalajeOrigenService.getDecalajeOrigenZ();
	}

    aceptar() {
		this.decalajeOrigenService.cargarDecalajeOrigen(this.nuevoDecalajeOrigenX, this.nuevoDecalajeOrigenZ);
		this.close.emit();
    }

    cancelar() {
        this.close.emit();
    }
}
