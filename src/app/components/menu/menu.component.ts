import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {
	visibleAreaProgramar: boolean = false;

	abrirAreaProgramar() {
        this.visibleAreaProgramar = true;
	}
	
	cerrarAreaProgramar() {
        this.visibleAreaProgramar = false;
    }

}
