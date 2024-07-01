import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadList } from '../shared/store/actions';
import { TableTypeEnum } from '../shared/enums/table-type.enum';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyTableData } from '../shared/models/currency-table';
import { Observable } from 'rxjs';
import { selectCurrencyLoading, selectCurrencySingleTableData } from '../shared/store/reducer';

@Component({
  selector: 'app-currency-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyListComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store);
  tableData$: Observable<CurrencyTableData>;
  isLoading$: Observable<boolean>;
  selectedDateControl = new FormControl();

  ngOnInit() {
    this.store.dispatch(loadList({ params: { tableType: TableTypeEnum.C, params: { format: 'json' } } }));
    this.tableData$ = this.store.select(selectCurrencySingleTableData);
    this.isLoading$ = this.store.select(selectCurrencyLoading);
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
  }
}
