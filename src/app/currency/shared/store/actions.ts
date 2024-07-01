import { createAction, props } from '@ngrx/store';
import { ListActionParams } from './models/list-action-params';
import { CurrencyTableData } from '../models/currency-table';

export const loadList = createAction('[Currency] Load List', props<{ params: ListActionParams }>());
export const loadListSuccess = createAction('[Currency] Load List Success', props<{ list: CurrencyTableData[] }>());
export const loadListFailure = createAction('[Currency] Load List Failure', props<{ error: any }>());
