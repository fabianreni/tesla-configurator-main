import { NgModule } from '@angular/core';

import { TeslaRoutingModule } from './tesla-routing.module';
import { TeslaConfigComponent } from './tesla-config/tesla-config.component';


@NgModule({
  declarations: [],
  imports: [
    TeslaRoutingModule
  ],
  exports:[
    TeslaConfigComponent
  ]
})
export class TeslaModule { }
