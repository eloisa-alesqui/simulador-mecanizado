import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DesplazamientoService } from '../../services/desplazamiento.service';
import { ActualizacionPosicionHerramientaService } from '../../services/actualizacion-posicion-herramienta.service';
import { Subscription } from 'rxjs/Subscription';

import * as globals from '../../globals';


@Component({
  selector: 'app-area-simulacion',
  templateUrl: './area-simulacion.component.html',
  styleUrls: ['./area-simulacion.component.less']
})
export class AreaSimulacionComponent implements OnInit {

  subscription: Subscription;
  @ViewChild('herramienta') herramienta: ElementRef;
  @ViewChild('areaSimulacion') areaSimulacion: ElementRef;
  @ViewChild('areaSimulacionCanvas') areaSimulacionCanvas: ElementRef;

  constructor(private desplazamientoService: DesplazamientoService,
    private actualizacionPosicionHerramientaService: ActualizacionPosicionHerramientaService) {


    this.subscription = this.desplazamientoService.getDesplazamiento().subscribe(desplazamiento => {

      // Se procede al movimiento de la herramienta
      let herramienta: SVGRectElement = this.herramienta.nativeElement;

      let desplazamientoX: number = desplazamiento.x;
      let desplazamientoY: number = desplazamiento.y;

      let posicionXInicial: number = parseFloat(herramienta.getAttribute("x"));
      let posicionXFinal: number = desplazamientoX + posicionXInicial;
      herramienta.setAttribute('x', posicionXFinal.toString());
      let posicionYInicial: number = parseFloat(herramienta.getAttribute("y"));
      let posicionYFinal: number = desplazamiento.y + posicionYInicial;
      herramienta.setAttribute('y', posicionYFinal.toString());

      // Se procede al borrado de la pieza
      let canvas: HTMLCanvasElement = this.areaSimulacionCanvas.nativeElement;
      let context: CanvasRenderingContext2D = canvas.getContext('2d');

      let requestAnimationFrame =
        function (callback: any): number {
          return setTimeout(callback, 1);
        };

      let goma: Goma = {
        'x': posicionXInicial,
        'y': posicionYInicial,
        'width': parseFloat(herramienta.getAttribute("width")),
        'height': parseFloat(herramienta.getAttribute("height"))
      };

      // Variables usadas en la actualizacion de la posicion
      let areaSimulacion: HTMLDivElement = this.areaSimulacion.nativeElement;
      let anchoAreaSimulacion: number = areaSimulacion.offsetWidth;
      let altoAreaSimulacion: number = areaSimulacion.offsetHeight;
      let actualizacionPosicionHerramientaService: ActualizacionPosicionHerramientaService = this.actualizacionPosicionHerramientaService;

      let render = function (): void {
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(goma.x, goma.y, goma.width, goma.height);
        requestAnimationFrame(render);
      };
      render();

      let animate = function (prop: string, val: number, duration: number): void {
        // Calculos requeridos para la funcion step
        let start: number = new Date().getTime();
        let end: number = start + duration;
        let current: number = goma[prop];
        let distance: number = val - current;

        let i: number = 0;

        let step = function () : void {
          let timestamp: number = new Date().getTime();
          let progress: number = Math.min((duration - (end - timestamp)) / duration, 1);
          goma[prop] = current + (distance * progress);
          if (progress < 1) {
            // Se actualiza la posicion de la herramienta cada 10 saltos
            if (i % 10 == 0) {
              actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
                altoAreaSimulacion - goma.y, goma.x);
            }
            i++;
            requestAnimationFrame(step);
          } else {
            // Se actualiza la posicion de la herramienta al final de la animacion
            // para que quede correcta
            actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
              altoAreaSimulacion - posicionYFinal, posicionXFinal);
          }
        };

        return step();
      };

      // Borrado 
		animate('x', desplazamiento.x + posicionXInicial, 5000);
		animate('y', desplazamiento.y + posicionYInicial, 5000);

    })
  }

  ngOnInit() {
    // Se redimensiona el canvas
    let areaSimulacion = this.areaSimulacion.nativeElement;
    let areaSimulacionCanvas = this.areaSimulacionCanvas.nativeElement;

    let anchoAreaSimulacion = areaSimulacion.offsetWidth;
    areaSimulacionCanvas.setAttributeNS(null, 'width', anchoAreaSimulacion);

    let altoAreaSimulacion = areaSimulacion.offsetHeight;
    areaSimulacionCanvas.setAttributeNS(null, 'height', altoAreaSimulacion);

    // Se dibuja la pieza
    let ctx = areaSimulacionCanvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, altoAreaSimulacion - globals.ALTO_PIEZA, globals.ANCHO_PIEZA, globals.ALTO_PIEZA);

    // Se actualiza la posicion de la herramienta al inicio de lasimulacion
    let herramienta: SVGRectElement = this.herramienta.nativeElement;
    let posicionXInicial: number = parseFloat(herramienta.getAttribute("x"));
    let posicionYInicial: number = parseFloat(herramienta.getAttribute("y"));
    this.actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
      altoAreaSimulacion - posicionYInicial, posicionXInicial);
  }

}

class Goma {
    x: number;
    y: number;
    width: number;
    height: number;
}
