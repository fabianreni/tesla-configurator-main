import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelOptionsComponent } from './model-options/model-options.component';
import { ModelConfigComponent } from './model-config/model-config.component';
import { ConfigSummaryComponent } from './config-summary/config-summary.component';
import { ModelConfigGuardService } from '../../shared/router-guard/model-config-guard.service';
import { ModelOptionConfigGuardService } from '../../shared/router-guard/model-option-config-guard.service';

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
    path: 'config/options',
    component: ModelOptionsComponent,
    canActivate: [ModelConfigGuardService]
  },
  {
    path: 'config/summary',
    component: ConfigSummaryComponent,
    canActivate: [ModelConfigGuardService, ModelOptionConfigGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeslaRoutingModule { }
