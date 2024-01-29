import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { ConfigSummaryComponent } from './features/config-summary/config-summary.component';
import { ModelConfigComponent } from './features/model-config/model-config.component';
import { ModelTypeComponent } from './features/model-type/model-type.component';
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
        path: 'config/options',
        component: ModelTypeComponent,
        canActivate: [ModelConfigGuardService]
    },
    {
        path: 'config/summary',
        component: ConfigSummaryComponent,
        canActivate: [ModelConfigGuardService, ModelOptionConfigGuardService]
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
