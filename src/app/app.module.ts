import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { AreaSimulacionComponent } from './components/area-simulacion/area-simulacion.component';
import { AreaTrabajoMecanizadoComponent } from './components/area-trabajo-mecanizado/area-trabajo-mecanizado.component';
import { MandosManejoComponent } from './components/mandos-manejo/mandos-manejo.component';
import { MandosManejoPosicionComponent } from './components/mandos-manejo-posicion/mandos-manejo-posicion.component';
import { MandosManejoModoComponent } from './components/mandos-manejo-modo/mandos-manejo-modo.component';
import { MandosManejoBotoneraMovimientosComponent } from './components/mandos-manejo-botonera-movimientos/mandos-manejo-botonera-movimientos.component';
import { MandosManejoRunStopComponent } from './components/mandos-manejo-run-stop/mandos-manejo-run-stop.component';
import { MandosManejoSecuenciaAutomaticoComponent } from './components/mandos-manejo-secuencia-automatico/mandos-manejo-secuencia-automatico.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AreaSimulacionComponent,
    AreaTrabajoMecanizadoComponent,
    MandosManejoComponent,
    MandosManejoPosicionComponent,
	MandosManejoModoComponent,
	MandosManejoBotoneraMovimientosComponent,
	MandosManejoRunStopComponent,
	MandosManejoSecuenciaAutomaticoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
