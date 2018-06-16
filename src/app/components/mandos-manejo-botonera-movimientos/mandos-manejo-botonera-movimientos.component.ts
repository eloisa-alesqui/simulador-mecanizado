import { Component } from '@angular/core';
import { DesplazamientoService } from '../../services/desplazamiento.service';

@Component({
	selector: 'app-mandos-manejo-botonera-movimietos',
	templateUrl: './mandos-manejo-botonera-movimientos.component.html',
	styleUrls: ['./mandos-manejo-botonera-movimientos.component.less']
})
export class MandosManejoBotoneraMovimientosComponent {

	constructor(private desplazamientoService: DesplazamientoService) {}

	moverHerramientaDerecha() {
		this.desplazamientoService.sendDesplazamiento(100, 0);
	}

	moverHerramientaAbajo() {
		this.desplazamientoService.sendDesplazamiento(0, 100);
	}

	moverHerramientaIzquierda() {
		this.desplazamientoService.sendDesplazamiento(-100, 0);
	}

	moverHerramientaArriba() {
		this.desplazamientoService.sendDesplazamiento(0, -100);
	}

	
}
