import { Component } from '@angular/core';
import { ActualizacionPosicionHerramientaService } from '../../services/actualizacion-posicion-herramienta.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-mandos-manejo-posicion',
  templateUrl: './mandos-manejo-posicion.component.html',
  styleUrls: ['./mandos-manejo-posicion.component.less']
})
export class MandosManejoPosicionComponent {

	x:string = '0';
	z:string = '0';
	subscription: Subscription;

	constructor(private actualizacionPosicionHerramientaService: ActualizacionPosicionHerramientaService) {
		this.subscription = this.actualizacionPosicionHerramientaService.getActualizacionPosicionHerramienta().subscribe(posicion => {
			this.x = posicion.x.toFixed(1);
			this.z = posicion.z.toFixed(1);
		});
	}

}
