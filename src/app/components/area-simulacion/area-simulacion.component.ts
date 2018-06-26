import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DesplazamientoService } from '../../services/desplazamiento.service';
import { ActualizacionPosicionHerramientaService } from '../../services/actualizacion-posicion-herramienta.service';
import { VelocidadService } from '../../services/velocidad.service';
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
    private actualizacionPosicionHerramientaService: ActualizacionPosicionHerramientaService,
    private velocidadService: VelocidadService) {


    this.subscription = this.desplazamientoService.getDesplazamiento().subscribe(desplazamiento => {

      // Se procede al movimiento de la herramienta
      let herramienta: SVGPolygonElement = this.herramienta.nativeElement;

      let desplazamientoX: number = desplazamiento.x;
      let desplazamientoY: number = desplazamiento.y;

      // Se calcula el tiempo que durara el desplazamiento
      let desplazamientoLongitud: number = Math.sqrt(Math.pow(desplazamientoX, 2) + Math.pow(desplazamientoY, 2));
      let desplazamientoVelocidad: number = this.velocidadService.getVelocidad();
      let desplazamientoTiempo = desplazamientoLongitud / desplazamientoVelocidad;

      // Posicion inicial y final de la maquina en el desplazamiento
      let posicionXInicial: number = parseFloat(herramienta.getAttribute('points').split(' ')[0].split(',')[0]);
      let posicionXFinal: number = desplazamientoX + posicionXInicial;
      let posicionYInicial: number = parseFloat(herramienta.getAttribute('points').split(' ')[0].split(',')[1]);
      let posicionYFinal: number = desplazamiento.y + posicionYInicial;

      // Se procede al borrado de la pieza
      let canvas: HTMLCanvasElement = this.areaSimulacionCanvas.nativeElement;
      let context: CanvasRenderingContext2D = canvas.getContext('2d');

      // Variables usadas en la actualizacion de la posicion
      let points: string = herramienta.getAttribute('points');
      let areaSimulacion: HTMLDivElement = this.areaSimulacion.nativeElement;
      let anchoAreaSimulacion: number = areaSimulacion.offsetWidth;
      let altoAreaSimulacion: number = areaSimulacion.offsetHeight;
      let actualizacionPosicionHerramientaService: ActualizacionPosicionHerramientaService = this.actualizacionPosicionHerramientaService;

      let i: number = 0;

      let moverBorrar = function (progress: number) {
        context.fillStyle = "rgb(255,255,255)";
        context.beginPath();
        let primerPunto: boolean = true;
        let pointsStringInicial: string = points;
        let pointsStringFinal: string = '';
        let pointsArrayStringInicial: string[] = pointsStringInicial.split(' ');
        pointsArrayStringInicial.forEach(function (pointStringInicial: string) {
          let pointInicial: string[] = pointStringInicial.split(',');
          let xInicial: number = parseFloat(pointInicial[0]);
          let yInicial: number = parseFloat(pointInicial[1]);
          let xFinal: number = xInicial + desplazamientoX * progress;
          let yFinal: number = yInicial + desplazamientoY * progress;
          pointsStringFinal = pointsStringFinal + xFinal + ',' + yFinal + ' ';
          if (primerPunto) {
            context.moveTo(xFinal, yFinal);
            primerPunto = false;
          } else {
            context.lineTo(xFinal, yFinal);
          }
        });
        pointsStringFinal = pointsStringFinal.trim();
        herramienta.setAttribute('points', pointsStringFinal);
        context.closePath();
        context.fill();
      }

      let requestAnimationFrame = function (callback: any): number {
        return setTimeout(callback, 1);
      };

      let animate = function (duration: number): void {
        // Calculos requeridos para la funcion step
        let start: number = new Date().getTime();
        let end: number = start + duration;

        let step = function (): void {
          let timestamp: number = new Date().getTime();
          let progress: number = Math.min((duration - (end - timestamp)) / duration, 1);
          if (progress < 1) {
            // Se actualizan los puntos y se procede al borrado
            moverBorrar(progress);

            // Se actualiza la posicion de la herramienta cada 10 saltos
            if (i % 10 == 0) {
              let posicionX: number = parseFloat(points.split(' ')[0].split(',')[0]) + (desplazamientoX * progress);
              let posicionY: number = parseFloat(points.split(' ')[0].split(',')[1]) + (desplazamientoY * progress);
              actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
                altoAreaSimulacion - posicionY, posicionX);
            }
            i++;
            requestAnimationFrame(step);
          } else {
            // Se actualiza la posicion de la herramienta al final de la animacion
            // para que quede correcta
            actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
              altoAreaSimulacion - posicionYFinal, posicionXFinal);
            // Se actualizan los puntos y se procede al borrado
            moverBorrar(progress);
          }
        };

        return step();
      };

      // Borrado 
      animate(desplazamientoTiempo * 1000);

    })
  }

  ngOnInit() {
    // Se redimensiona el canvas
    let areaSimulacion: HTMLDivElement = this.areaSimulacion.nativeElement;
    let areaSimulacionCanvas: HTMLCanvasElement = this.areaSimulacionCanvas.nativeElement;

    let anchoAreaSimulacion: number = areaSimulacion.offsetWidth;
    areaSimulacionCanvas.setAttribute('width', anchoAreaSimulacion.toString());

    let altoAreaSimulacion: number = areaSimulacion.offsetHeight;
    areaSimulacionCanvas.setAttribute('height', altoAreaSimulacion.toString());

    // Se dibuja la pieza
    let ctx: CanvasRenderingContext2D = areaSimulacionCanvas.getContext('2d');
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, altoAreaSimulacion - globals.ALTO_PIEZA, globals.ANCHO_PIEZA, globals.ALTO_PIEZA);

    // Se actualiza la posicion de la herramienta al inicio de lasimulacion
    let herramienta: SVGRectElement = this.herramienta.nativeElement;
    let posicionXInicial: number = parseFloat(herramienta.getAttribute('points').split(' ')[0].split(',')[0]);
    let posicionYInicial: number = parseFloat(herramienta.getAttribute('points').split(' ')[0].split(',')[1]);
    this.actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
      altoAreaSimulacion - posicionYInicial, posicionXInicial);
  }

}