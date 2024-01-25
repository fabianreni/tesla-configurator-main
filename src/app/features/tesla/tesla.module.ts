import { NgModule } from '@angular/core';

import { TeslaRoutingModule } from './tesla-routing.module';
import { TeslaConfigComponent } from './tesla-config/tesla-config.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    TeslaRoutingModule,
  ],
  exports: [
    TeslaConfigComponent
  ]
})
export class TeslaModule { }