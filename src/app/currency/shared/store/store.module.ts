import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { currencyReducer, reducerKey } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from './effects';
import { CurrencyService } from './service';

@NgModule({
  imports: [
    StoreModule.forFeature(reducerKey, currencyReducer),
    EffectsModule.forFeature([CurrencyEffects])
  ],
  providers: [CurrencyService]
})
export class CurrencyStoreModule {
}
