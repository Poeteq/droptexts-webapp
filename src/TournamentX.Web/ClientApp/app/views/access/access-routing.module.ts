import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomAccessComponent } from './access.component';

const routes: Routes = [
    { path: '', component: TomAccessComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessRoutingModule {
    static components = [
    ]
}
