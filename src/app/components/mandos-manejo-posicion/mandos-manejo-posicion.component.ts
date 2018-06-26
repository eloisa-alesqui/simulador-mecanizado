import { Component } from '@angular/core';
import { PosicionHerramientaService } from '../../services/posicion-herramienta.service';

@Component({
  selector: 'app-mandos-manejo-posicion',
  templateUrl: './mandos-manejo-posicion.component.html',
  styleUrls: ['./mandos-manejo-posicion.component.less']
})
export class MandosManejoPosicionComponent {

	constructor(private posicionHerramientaService: PosicionHerramientaService) {
		
	}

}
