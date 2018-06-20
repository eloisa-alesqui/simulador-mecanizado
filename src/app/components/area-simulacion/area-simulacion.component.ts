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

			let desplazamientoX: number = parseFloat(desplazamiento.x);
			let desplazamientoY: number = parseFloat(desplazamiento.y);

			let posicionXInicial: number = parseFloat(herramienta.getAttribute("x"));
			let posicionXFinal: number = desplazamientoX + posicionXInicial;
			herramienta.setAttribute('x', posicionXFinal.toString());
			let posicionYInicial: number = parseFloat(herramienta.getAttribute("y"));
			let posicionYFinal: number = desplazamiento.y + posicionYInicial;
			herramienta.setAttribute('y', posicionYFinal.toString());

			// Se actualiza la posicion
			//let areaSimulacion = this.areaSimulacion.nativeElement;
			//let anchoAreaSimulacion = areaSimulacion.offsetWidth;
			//let altoAreaSimulacion = areaSimulacion.offsetHeight;
			//this.actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta
			//	(altoAreaSimulacion - posicionYFinal, posicionXFinal);


			// Se procede al borrado de la pieza
			var canvas = this.areaSimulacionCanvas.nativeElement;
			var context = canvas.getContext('2d');

			var requestAnimationFrame =
				function (callback) {
					return setTimeout(callback, 1);
				};

			var goma = {
				'x': posicionXInicial,
				'y': posicionYInicial,
				'width': parseFloat(herramienta.getAttribute("width")),
				'height': parseFloat(herramienta.getAttribute("height"))
			};

			let areaSimulacionn = this.areaSimulacion.nativeElement;
			let actualizacionPosicionHerramientaService = this.actualizacionPosicionHerramientaService;
			let i = 0;

			var render = function () {
				context.fillStyle = "rgb(255,255,255)";
				context.fillRect(goma.x, goma.y, goma.width, goma.height);
				// Se actualiza la posicion
				if (i%10 == 0) {
					actualizacionPosicionHerramientaService.sendActualizacionPosicionHerramienta(
					goma.x, goma.y);
				}
				i++;
				requestAnimationFrame(render);
			};
			render();

			var animate = function (prop, val, duration) {
				// Calculos requeridos para la funcion step
				var start = new Date().getTime();
				var end = start + duration;
				var current = goma[prop];
				var distance = val - current;

				var step = function () {
					var timestamp = new Date().getTime();
					var progress = Math.min((duration - (end - timestamp)) / duration, 1);
					goma[prop] = current + (distance * progress);
					if (progress < 1) requestAnimationFrame(step);
				};

				return step();
			};

			// Borrado vertical
			if (parseFloat(desplazamiento.x) == 0) {
				animate('y', parseFloat(desplazamiento.y) + posicionYInicial, 5000);
			}

			// Borrado horizontal
			else {
				animate('x', parseFloat(desplazamiento.x) + posicionXInicial, 5000);
			}

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
	}

}
