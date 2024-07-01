import { CurrencyService } from './service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CurrencyListActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CurrencyEffects {
  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyListActions.loadList),
      map((action) => action.params),
      mergeMap((params) =>
        this.currencyService.loadList(params.tableType, params.params, params.date).pipe(
          map(list => CurrencyListActions.loadListSuccess({ list })),
          catchError(error => of(CurrencyListActions.loadListFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private currencyService: CurrencyService) {
  }
}
