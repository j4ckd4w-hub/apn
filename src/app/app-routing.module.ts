import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'currency' },
  { path: 'currency', loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule) },
  {
    path: '404',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent)
  },
  { path: '**', pathMatch: 'full', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
