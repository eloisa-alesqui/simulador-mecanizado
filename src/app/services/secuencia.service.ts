import { Injectable } from '@angular/core';

@Injectable()
export class SecuenciaService {
	private secuencia: String;

	constructor() {
		this.secuencia = "";
	}

	public cargarSecuencia(nuevaSecuencia: String) {
		this.secuencia = nuevaSecuencia;
	}
}