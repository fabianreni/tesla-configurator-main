import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '/',
        loadChildren: () =>
            import('./features/tesla/tesla-routing.module')
                .then(m => m.TeslaRoutingModule)
    }

];
