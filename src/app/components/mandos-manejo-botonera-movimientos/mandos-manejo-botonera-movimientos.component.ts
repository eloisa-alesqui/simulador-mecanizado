import { Component, ViewChild, ElementRef } from '@angular/core';
import { DesplazamientoService } from '../../services/desplazamiento.service';
import { VelocidadService } from '../../services/velocidad.service';

import * as globals from '../../globals';


@Component({
	selector: 'app-mandos-manejo-botonera-movimietos',
	templateUrl: './mandos-manejo-botonera-movimientos.component.html',
	styleUrls: ['./mandos-manejo-botonera-movimientos.component.less']
})
export class MandosManejoBotoneraMovimientosComponent {

	@ViewChild('velocidadBtn') herramienta: ElementRef;
	VELOCIDAD_RAPIDA : number = globals.VELOCIDAD_RAPIDA;

	constructor(private desplazamientoService: DesplazamientoService,
		private velocidadService: VelocidadService) {}

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

	cambiarVelocidad() {
		this.velocidadService.cambiarVelocidad();
	}
	
}
