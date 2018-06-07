import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-mandos-manejo-modo',
  templateUrl: './mandos-manejo-modo.component.html',
  styleUrls: ['./mandos-manejo-modo.component.less']
})
export class MandosManejoModoComponent implements OnInit {

  ngOnInit() {

    const rotarySwitch = $('.rotarySwitch').rotaryswitch({

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
      showInput: true,

      // Show deg marks
      showMarks: false,

      // Theme class0000
      themeClass: 'big'
    });

    const ss = document.styleSheets;
    for (let i = 0; i < ss.length; i++) {
      const rules = (<CSSStyleSheet>ss[i]).cssRules || (<CSSStyleSheet>ss[i]).rules;
      for (let j = 0; j < rules.length; j++) {
        if ((<CSSStyleRule>rules[j]).selectorText === '.rotaryswitchPlugin.big') {
          (<CSSStyleRule>rules[j]).style.width = '200px';
          (<CSSStyleRule>rules[j]).style.height = '200px';
        }
      }
    }

    const rotarySwitchData = rotarySwitch.data('plugin_rotaryswitch');
    rotarySwitchData.renderMarks();


  }

}
