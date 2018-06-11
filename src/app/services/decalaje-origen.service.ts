import { Injectable } from '@angular/core';

@Injectable()
export class DecalajeOrigenService {
	decalajeOrigenX: number;
	decalajeOrigenZ: number;

	constructor() {
		
	}

	public cargarDecalajeOrigen(decalajeOrigenX: number, decalajeOrigenZ: number) {
		this.decalajeOrigenX = decalajeOrigenX;
		this.decalajeOrigenZ = decalajeOrigenZ;
	}
}