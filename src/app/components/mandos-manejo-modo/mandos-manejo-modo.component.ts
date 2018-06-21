import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $: any;

@Component({
	selector: 'app-mandos-manejo-modo',
	templateUrl: './mandos-manejo-modo.component.html',
	styleUrls: ['./mandos-manejo-modo.component.less']
})
export class MandosManejoModoComponent implements OnInit {

	@ViewChild('contenedor') private contenedor: ElementRef;

	ngOnInit() {

		// Se crea el rotary switch
		let rotarySwitch = $('.rotarySwitch').rotaryswitch({
			// Minimal value
			minimum: 0,
			// Maximum value
			maximum: 5,
			// Step size
			step: 1,
			// Snap to steps in motion
			snapInMotion: true,
			// Start point in deg
			beginDeg: 300,
			// Length in deg
			lengthDeg: 150,
			// Which value will used, if the the start and the end point at the same deg.
			minimumOverMaximum: true,
			// Show input element
			showInput: false,
			// Show deg marks
			showMarks: false,
			// Theme class0000
			themeClass: 'big'
		});

		const rotarySwitchData = rotarySwitch.data('plugin_rotaryswitch');

		// Se ajusta el tamano y la posicion del rotary switch
		let ss: StyleSheetList = document.styleSheets;
		let anchuraContenedor: number = this.contenedor.nativeElement.offsetWidth;
		let tamanoRotarySwitch: number = anchuraContenedor * 0.45;
		for (let i: number = 0; i < ss.length; i++) {
			let rules: CSSRuleList = (<CSSStyleSheet>ss[i]).cssRules || (<CSSStyleSheet>ss[i]).rules;
			for (let j: number = 0; j < rules.length; j++) {
				if ((<CSSStyleRule>rules[j]).selectorText === '.rotaryswitchPlugin.big') {
					(<CSSStyleRule>rules[j]).style.width = tamanoRotarySwitch + 'px';
					(<CSSStyleRule>rules[j]).style.height = tamanoRotarySwitch + 'px';
				}
			}
		}
		let marginLeftRotarySwitch: number = (this.contenedor.nativeElement.offsetWidth - tamanoRotarySwitch) / 2.5;
		$('.rotaryswitchPlugin.big').css('margin-left', marginLeftRotarySwitch + 'px');

		// Se dibujan las marcas con los diferentes modos
		rotarySwitchData.renderMarks();


	}

}
