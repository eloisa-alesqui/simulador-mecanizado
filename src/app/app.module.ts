import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuProgramarComponent } from './components/menu-programar/menu-programar.component';
import { MenuDecalajeOrigenComponent } from './components/menu-decalaje-origen/menu-decalaje-origen.component';
import { AreaSimulacionComponent } from './components/area-simulacion/area-simulacion.component';
import { AreaTrabajoMecanizadoComponent } from './components/area-trabajo-mecanizado/area-trabajo-mecanizado.component';
import { MandosManejoComponent } from './components/mandos-manejo/mandos-manejo.component';
import { MandosManejoPosicionComponent } from './components/mandos-manejo-posicion/mandos-manejo-posicion.component';
import { MandosManejoModoComponent } from './components/mandos-manejo-modo/mandos-manejo-modo.component';
import { MandosManejoBotoneraMovimientosComponent } from './components/mandos-manejo-botonera-movimientos/mandos-manejo-botonera-movimientos.component';
import { MandosManejoRunStopComponent } from './components/mandos-manejo-run-stop/mandos-manejo-run-stop.component';
import { MandosManejoSecuenciaAutomaticoComponent } from './components/mandos-manejo-secuencia-automatico/mandos-manejo-secuencia-automatico.component';

import { SecuenciaService } from './services/secuencia.service';
import { DecalajeOrigenService } from './services/decalaje-origen.service';
import { DesplazamientoService } from './services/desplazamiento.service';
import { ActualizacionPosicionHerramientaService } from './services/actualizacion-posicion-herramienta.service';
import { VelocidadService } from './services/velocidad.service';


@NgModule({
  declarations: [
    AppComponent,
	MenuComponent,
	MenuProgramarComponent,
	MenuDecalajeOrigenComponent,
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
	BrowserModule,
	FormsModule
  ],
  providers: [
	  SecuenciaService, 
	  DecalajeOrigenService, 
	  DesplazamientoService,
	  ActualizacionPosicionHerramientaService,
	  VelocidadService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
