import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency.component';
import { NgModule } from '@angular/core';
import { CurrencyListComponent } from './list/list.component';

export const routes: Routes = [
  {
    path: '', component: CurrencyComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: CurrencyListComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule {
}
