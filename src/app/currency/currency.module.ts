import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyListComponent } from './list/list.component';
import { CurrencyStoreModule } from './shared/store/store.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrencyComponent, CurrencyListComponent],
  imports: [CommonModule, CurrencyRoutingModule, CurrencyStoreModule, ReactiveFormsModule],
  exports: [],
  providers: []
})
export class CurrencyModule {
}
