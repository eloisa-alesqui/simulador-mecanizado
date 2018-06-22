import { Injectable } from '@angular/core';

import * as globals from '../globals';

@Injectable()
export class VelocidadService {
	private velocidad: number;

	constructor() {
		this.velocidad = globals.VELOCIDAD_LENTA;
	}

	public getVelocidad() {
		return this.velocidad;
	}

	public cambiarVelocidad() {
		if (this.velocidad == globals.VELOCIDAD_LENTA) {
			this.velocidad = globals.VELOCIDAD_RAPIDA; 
		} else {
			this.velocidad = globals.VELOCIDAD_LENTA; 
		}
	}
}