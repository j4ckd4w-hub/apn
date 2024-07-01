import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '', component: CurrencyComponent, children: [
      // { path: '', pathMatch: 'full', redirectTo: 'list' },
      // { path: 'list', component }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule {
}
