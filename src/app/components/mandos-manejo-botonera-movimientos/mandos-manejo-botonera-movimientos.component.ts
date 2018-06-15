import { Component } from '@angular/core';

@Component({
	selector: 'app-mandos-manejo-botonera-movimietos',
	templateUrl: './mandos-manejo-botonera-movimientos.component.html',
	styleUrls: ['./mandos-manejo-botonera-movimientos.component.less']
})
export class MandosManejoBotoneraMovimientosComponent  {

	moverPiezaDerecha () {
		alert('derecha');
	}

}
