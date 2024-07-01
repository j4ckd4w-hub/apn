import { FormBuilder, FormGroup } from '@angular/forms';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class ExchangeFormBuilder {
  formBuilder: FormBuilder = inject(FormBuilder);

  readonly keys = {
    currencyFrom: 'currencyFrom',
    currencyFromValue: 'currencyFromValue',
    currencyTo: 'currencyTo',
    currencyToValue: 'currencyToValue'
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      [this.keys.currencyFrom]: this.formBuilder.control(null),
      [this.keys.currencyFromValue]: this.formBuilder.control(null),
      [this.keys.currencyTo]: this.formBuilder.control(null),
      [this.keys.currencyToValue]: this.formBuilder.control({ value: null, disabled: true }),
    })
  }
}
