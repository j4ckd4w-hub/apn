import { CurrencyService } from './service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CurrencyListActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CurrencyEffects {
  private actions$ = inject(Actions);
  private currencyService = inject(CurrencyService);

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
}
