import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { CurrencyRoutingModule } from './currency-routing.module';

@NgModule({
  declarations: [CurrencyComponent],
  imports: [CommonModule, CurrencyRoutingModule],
  exports: [],
  providers: []
})
export class CurrencyModule {
}
