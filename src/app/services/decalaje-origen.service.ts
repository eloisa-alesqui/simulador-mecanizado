import { Injectable } from '@angular/core';

@Injectable()
export class DecalajeOrigenService {
	private decalajeOrigenX: number;
	private decalajeOrigenZ: number;

	constructor() {
		this.decalajeOrigenX = 0;
		this.decalajeOrigenZ = 0;
	}

	public getDecalajeOrigenX () {
		return this.decalajeOrigenX;
	}

	public getDecalajeOrigenZ () {
		return this.decalajeOrigenZ;
	}

	public cargarDecalajeOrigen(decalajeOrigenX: number, decalajeOrigenZ: number) {
		this.decalajeOrigenX = decalajeOrigenX;
		this.decalajeOrigenZ = decalajeOrigenZ;
	}
}