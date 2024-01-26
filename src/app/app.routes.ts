import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/tesla/tesla-routing.module')
                .then(m => m.TeslaRoutingModule)
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
