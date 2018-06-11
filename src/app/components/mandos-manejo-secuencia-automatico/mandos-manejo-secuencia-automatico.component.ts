import { Component } from '@angular/core';
import { SecuenciaService } from '../../services/secuencia.service';


@Component({
	selector: 'app-mandos-manejo-secuencia-automatico',
	templateUrl: './mandos-manejo-secuencia-automatico.component.html',
	styleUrls: ['./mandos-manejo-secuencia-automatico.component.less']
})
export class MandosManejoSecuenciaAutomaticoComponent  {

	constructor(private secuenciaService : SecuenciaService) {
		
	}

}
