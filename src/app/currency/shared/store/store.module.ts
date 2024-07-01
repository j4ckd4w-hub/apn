import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { currencyReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from './effects';
import { CurrencyService } from './service';

@NgModule({
  imports: [
    StoreModule.forFeature('currency', currencyReducer),
    EffectsModule.forFeature([CurrencyEffects])
  ],
  providers: [CurrencyService]
})
export class CurrencyStoreModule {
}
