import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeslaConfigComponent } from './tesla-config/tesla-config.component';
import { ModelOptionsComponent } from './model-options/model-options.component';
import { ModelConfigComponent } from './model-config/model-config.component';
import { ConfigSummaryComponent } from './config-summary/config-summary.component';

const routes: Routes = [
  {
    path: 'config/model',
    component: ModelOptionsComponent
  },
  {
    path: 'config/options',
    component: ModelConfigComponent
  },
  {
    path: 'config/summary',
    component: ConfigSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeslaRoutingModule { }
