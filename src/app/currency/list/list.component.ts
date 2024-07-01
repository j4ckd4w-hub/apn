import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadList } from '../shared/store/actions';
import { TableTypeEnum } from '../shared/enums/table-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyTableData } from '../shared/models/currency-table';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { selectCurrencyLoading, selectCurrencySingleTableData } from '../shared/store/reducer';
import { CurrencyRate } from '../shared/models/currency-rate';
import { ExchangeFormBuilder } from '../shared/form-builders/exchange-form-builder';

@Component({
  selector: 'app-currency-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyListComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store);
  exchangeFormBuilder = inject(ExchangeFormBuilder);
  tableData$: Observable<CurrencyTableData>;
  isLoading$: Observable<boolean>;
  selectedDateControl = new FormControl();
  currencyList$: Observable<CurrencyRate[]>;
  form: FormGroup;

  readonly defaultCurrencyCode: string = 'PLN';

  ngOnInit() {
    this.formFlow();
    this.dataFlow();
  }

  dataFlow(): void {
    this.tableData$ = this.store.select(selectCurrencySingleTableData);
    this.isLoading$ = this.store.select(selectCurrencyLoading);

    this.store.dispatch(loadList({ params: { tableType: TableTypeEnum.C, params: { format: 'json' } } }));
    this.selectedDateControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(date => {
      this.store.dispatch(loadList({
        params: {
          tableType: TableTypeEnum.C,
          params: { format: 'json' },
          ...(!!date ? { date } : {})
        }
      }));
    })

    this.currencyList$ = this.tableData$.pipe(
      filter((table: CurrencyTableData) => !!table?.rates),
      map((table: CurrencyTableData) => table.rates));

    this.currencyList$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(_ => {
      // update conversion after reload data
      this.convertCurrencies();
    })
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

  async convertCurrencies(): Promise<void> {
    const currencyFromCode: string = this.form.get(this.exchangeFormBuilder.keys.currencyFrom).value;
    const currencyToCode: string = this.form.get(this.exchangeFormBuilder.keys.currencyTo).value;
    const currencyFrom: CurrencyRate = await firstValueFrom(this.currencyList$.pipe(map((list: CurrencyRate[]) => list.find((el: CurrencyRate) => el.code === currencyFromCode))))
    const currencyTo: CurrencyRate = await firstValueFrom(this.currencyList$.pipe(map((list: CurrencyRate[]) => list.find((el: CurrencyRate) => el.code === currencyToCode))))

    const currencyFromValue = this.form.get(this.exchangeFormBuilder.keys.currencyFromValue).value;
    const fromRate = currencyFrom?.bid || 1;
    const toRate = currencyTo?.ask || 1;
    const result = Math.floor(currencyFromValue * (fromRate / toRate) * 100) / 100;
    this.form.patchValue({
      [this.exchangeFormBuilder.keys.currencyToValue]: result
    });
  }
}
