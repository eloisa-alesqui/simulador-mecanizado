import { Component, Output, EventEmitter } from '@angular/core';
import { SecuenciaService } from '../../services/secuencia.service';

@Component({
  selector: 'app-menu-programar',
  templateUrl: './menu-programar.component.html',
  styleUrls: ['./menu-programar.component.less']
})
export class MenuProgramarComponent {
	@Output() close: EventEmitter<String>;
	nuevaSecuencia: String;

	constructor(private secuenciaService : SecuenciaService) {
		this.close  = new EventEmitter<String>();
		this.nuevaSecuencia = "";
	}

    aceptar() {
		this.secuenciaService.cargarSecuencia(this.nuevaSecuencia);
		this.close.emit();
    }

    cancelar() {
        this.close.emit();
    }
}
