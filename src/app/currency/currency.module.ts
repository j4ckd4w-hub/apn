import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyListComponent } from './list/list.component';
import { CurrencyStoreModule } from './shared/store/store.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExchangeFormBuilder } from './shared/form-builders/exchange-form-builder';
import { CurrencyTableComponent } from './shared/components/table/table.component';
import { CurrencyExchangeComponent } from './shared/components/exchange/exchange.component';
import { SkeletonComponent } from '../shared/components/skeleton/skeleton.component';

@NgModule({
  declarations: [CurrencyComponent, CurrencyListComponent, CurrencyTableComponent, CurrencyExchangeComponent],
  imports: [CommonModule, CurrencyRoutingModule, CurrencyStoreModule, ReactiveFormsModule, SkeletonComponent],
  exports: [],
  providers: [ExchangeFormBuilder]
})
export class CurrencyModule {
}
