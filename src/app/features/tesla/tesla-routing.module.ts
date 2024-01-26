import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelOptionsComponent } from './model-options/model-options.component';
import { ModelConfigComponent } from './model-config/model-config.component';
import { ConfigSummaryComponent } from './config-summary/config-summary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'config/model',
    pathMatch: 'full'
  },
  {
    path: 'config/model',
    component: ModelConfigComponent
  },
  {
    path: 'config/options/:modelCode',
    component: ModelOptionsComponent
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
