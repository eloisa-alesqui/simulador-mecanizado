import { Component, ViewChild, ElementRef } from '@angular/core';
import { DesplazamientoService } from '../../services/desplazamiento.service';
import { VelocidadService } from '../../services/velocidad.service';
import { ModoService } from '../../services/modo.service';

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
		private velocidadService: VelocidadService,
		private modoService: ModoService) {}

	moverHerramientaDerecha() {
		if (this.modoService.getModo() == globals.MODO_1) {
			this.desplazamientoService.sendDesplazamiento(1, 0);
		} else if (this.modoService.getModo() == globals.MODO_10) {
			this.desplazamientoService.sendDesplazamiento(10, 0);
		} else if (this.modoService.getModo() == globals.MODO_100) {
			this.desplazamientoService.sendDesplazamiento(100, 0);
		}
	}

	moverHerramientaAbajo() {
		if (this.modoService.getModo() == globals.MODO_1) {
			this.desplazamientoService.sendDesplazamiento(0, 1);
		} else if (this.modoService.getModo() == globals.MODO_10) {
			this.desplazamientoService.sendDesplazamiento(0, 10);
		} else if (this.modoService.getModo() == globals.MODO_100) {
			this.desplazamientoService.sendDesplazamiento(0, 100);
		}
	}

	moverHerramientaIzquierda() {
		if (this.modoService.getModo() == globals.MODO_1) {
			this.desplazamientoService.sendDesplazamiento(-1, 0);
		} else if (this.modoService.getModo() == globals.MODO_10) {
			this.desplazamientoService.sendDesplazamiento(-10, 0);
		} else if (this.modoService.getModo() == globals.MODO_100) {
			this.desplazamientoService.sendDesplazamiento(-100, 0);
		}
	}

	moverHerramientaArriba() {
		if (this.modoService.getModo() == globals.MODO_1) {
			this.desplazamientoService.sendDesplazamiento(0, -1);
		} else if (this.modoService.getModo() == globals.MODO_10) {
			this.desplazamientoService.sendDesplazamiento(0, -10);
		} else if (this.modoService.getModo() == globals.MODO_100) {
			this.desplazamientoService.sendDesplazamiento(0, -100);
		}
	}

	cambiarVelocidad() {
		this.velocidadService.cambiarVelocidad();
	}
	
}
