import { Injectable } from '@angular/core';

import * as globals from '../globals';

@Injectable()
export class ModoService {
	private modo: number;

	constructor() {
		this.modo = globals.MODO_AUT;
	}

	public getModo() {
		return this.modo;
	}

	public setModo(modo: number) {
		this.modo = modo;
	}
}