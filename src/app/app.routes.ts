import { Routes } from '@angular/router';
import { ComponentNotFoundComponent } from './shared/component-not-found/component-not-found.component';
import { ConfigSummaryComponent } from './features/config-summary/config-summary.component';
import { ModelConfigComponent } from './features/model-config/model-config.component';
import { ModelOptionConfigComponent } from './features/model-option-config/model-option-config.component';
import { ModelConfigGuardService } from './shared/router-guard/model-config-guard.service';
import { ModelOptionConfigGuardService } from './shared/router-guard/model-option-config-guard.service';

export const routes: Routes = [
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
        path: 'config/option/:modelCode',
        component: ModelOptionConfigComponent,
        canActivate: [ModelConfigGuardService]
    },
    {
        path: 'config/summary',
        component: ConfigSummaryComponent,
        canActivate: [ModelConfigGuardService, ModelOptionConfigGuardService]
    },
    {
        path: '**',
        component: ComponentNotFoundComponent
    }
];
