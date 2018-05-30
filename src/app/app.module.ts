import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { AreaSimulacionComponent } from './components/area-simulacion/area-simulacion.component';
import { AreaTrabajoMecanizadoComponent } from './components/area-trabajo-mecanizado/area-trabajo-mecanizado.component';
import { MandosManejoComponent } from './components/mandos-manejo/mandos-manejo.component';


@NgModule({
  declarations: [
	AppComponent,
	MenuComponent,
	AreaSimulacionComponent,
	AreaTrabajoMecanizadoComponent,
	MandosManejoComponent,
	AreaTrabajoMecanizadoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
