import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-mandos-manejo',
  templateUrl: './mandos-manejo.component.html',
  styleUrls: ['./mandos-manejo.component.less']
})
export class MandosManejoComponent implements OnInit {

  ngOnInit() {
    $('.rotarySwitch').rotaryswitch();
  }


}
