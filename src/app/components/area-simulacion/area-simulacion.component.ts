import { Component, ViewChild, ElementRef } from '@angular/core';
import { DesplazamientoService } from '../../services/desplazamiento.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-area-simulacion',
  templateUrl: './area-simulacion.component.html',
  styleUrls: ['./area-simulacion.component.less']
})
export class AreaSimulacionComponent {

  subscription: Subscription;
  @ViewChild('herramienta') herramienta: ElementRef;

  constructor(private desplazamientoService: DesplazamientoService) {
    this.subscription = this.desplazamientoService.getDesplazamiento().subscribe(desplazamiento => {
      let herramienta = this.herramienta.nativeElement;
      let posicionXInicial = herramienta.getAttributeNS(null, "x");
      let posicionXFinal = parseFloat(desplazamiento.x) + parseFloat(posicionXInicial);
      herramienta.setAttributeNS(null, 'x', posicionXFinal);
      let posicionYInicial = herramienta.getAttributeNS(null, "y");
      let posicionYFinal = parseFloat(desplazamiento.y) + parseFloat(posicionYInicial);
      herramienta.setAttributeNS(null, 'y', posicionYFinal);
    })
  }



}
