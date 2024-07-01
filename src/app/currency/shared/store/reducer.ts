import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as CurrencyListActions from './actions';
import { CurrencyTableData } from '../models/currency-table';
import { HttpErrorResponse } from '@angular/common/http';

export const reducerKey = 'currency';

export interface CurrencyState {
  list: CurrencyTableData[];
  singleTableData: CurrencyTableData;
  loading: boolean;
  error: HttpErrorResponse;
}

export const initialState: CurrencyState = {
  list: [],
  singleTableData: null,
  loading: false,
  error: null,
};

export const currencyReducer = createReducer(
  initialState,
  on(CurrencyListActions.loadList, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CurrencyListActions.loadListSuccess, (state, { list }) => ({
    ...state,
    list,
    singleTableData: list[0],
    loading: false,
  })),
  on(CurrencyListActions.loadListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectCurrencyState = createFeatureSelector<CurrencyState>(reducerKey);
export const selectCurrencyList = createSelector(selectCurrencyState, (state: CurrencyState) => state.list);
export const selectCurrencySingleTableData = createSelector(selectCurrencyState, (state: CurrencyState) => state?.singleTableData);
export const selectCurrencyLoading = createSelector(selectCurrencyState, (state: CurrencyState) => state.loading);
export const selectCurrencyError = createSelector(selectCurrencyState, (state: CurrencyState) => state.error);
