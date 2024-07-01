import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ExchangeFormBuilder } from '../../form-builders/exchange-form-builder';
import { FormGroup } from '@angular/forms';
import { CurrencyRate } from '../../models/currency-rate';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './exchange.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyExchangeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  readonly exchangeFormBuilder = inject(ExchangeFormBuilder);
  form: FormGroup;
  _currencyList: CurrencyRate[];
  @Input() set currencyList(value: CurrencyRate[]) {
    this._currencyList = value;
    this.convertCurrencies();
  }

  readonly defaultCurrencyCode: string = 'PLN';

  ngOnInit() {
    this.formFlow();
  }

  formFlow(): void {
    this.form = this.exchangeFormBuilder.createForm();
    this.form.patchValue({
      [this.exchangeFormBuilder.keys.currencyFrom]: 'PLN',
      [this.exchangeFormBuilder.keys.currencyTo]: 'PLN'
    })

    // update conversion after form changes (skip 'currencyToValue' form control because it is result)
    this.form.get(this.exchangeFormBuilder.keys.currencyFrom).valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.convertCurrencies();
    })
    this.form.get(this.exchangeFormBuilder.keys.currencyTo).valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.convertCurrencies();
    })
    this.form.get(this.exchangeFormBuilder.keys.currencyFromValue).valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.convertCurrencies();
    })
  }

  convertCurrencies(): void {
    const currencyFromCode: string = this.form?.get(this.exchangeFormBuilder.keys.currencyFrom).value;
    const currencyToCode: string = this.form?.get(this.exchangeFormBuilder.keys.currencyTo).value;
    const currencyFrom: CurrencyRate = this._currencyList?.find((el: CurrencyRate) => el.code === currencyFromCode);
    const currencyTo: CurrencyRate = this._currencyList?.find((el: CurrencyRate) => el.code === currencyToCode);

    const currencyFromValue = this.form?.get(this.exchangeFormBuilder.keys.currencyFromValue).value;
    const fromRate = currencyFrom?.bid || 1;
    const toRate = currencyTo?.ask || 1;
    const result = Math.floor(currencyFromValue * (fromRate / toRate) * 100) / 100;
    this.form?.patchValue({
      [this.exchangeFormBuilder.keys.currencyToValue]: result
    });
  }

  reverseCurrencies(): void {
    const currencyFromCode: string = this.form.get(this.exchangeFormBuilder.keys.currencyFrom).value;
    this.form.patchValue({
      [this.exchangeFormBuilder.keys.currencyFrom]: this.form.get(this.exchangeFormBuilder.keys.currencyTo).value,
      [this.exchangeFormBuilder.keys.currencyTo]: currencyFromCode
    });
  }
}
