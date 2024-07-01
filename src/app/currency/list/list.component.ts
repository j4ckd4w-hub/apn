import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadList } from '../shared/store/actions';
import { TableTypeEnum } from '../shared/enums/table-type.enum';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyTableData } from '../shared/models/currency-table';
import { filter, map, Observable } from 'rxjs';
import { selectCurrencyError, selectCurrencyLoading, selectCurrencySingleTableData } from '../shared/store/reducer';
import { CurrencyRate } from '../shared/models/currency-rate';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-currency-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  private readonly snackbarService = inject(SnackbarService);
  tableData$: Observable<CurrencyTableData>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;
  selectedDateControl = new FormControl();
  currencyList$: Observable<CurrencyRate[]>;

  ngOnInit(): void {
    this.dataFlow();
  }

  dataFlow(): void {
    this.tableData$ = this.store.select(selectCurrencySingleTableData);
    this.isLoading$ = this.store.select(selectCurrencyLoading);
    this.error$ = this.store.select(selectCurrencyError);

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

    this.error$.pipe(
      filter(data => !!data),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((error: HttpErrorResponse) => {
      this.snackbarService.show(error.error, {
        duration: 2000,
        type: 'error'
      });
    })
  }
}
