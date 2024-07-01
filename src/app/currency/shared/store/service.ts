import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TableTypeEnum } from '../enums/table-type.enum';
import { ApiUrl } from '../../../shared/providers/providers';
import { CurrencyListParams } from '../models/params';
import { Observable } from 'rxjs';
import { CurrencyTableData } from '../models/currency-table';
import { createParamsString } from '../../../shared/utils/params-utils';

@Injectable()
export class CurrencyService {
  private http: HttpClient = inject(HttpClient);
  readonly baseUrl = inject(ApiUrl);
  readonly routeUrl = `${this.baseUrl}/exchangerates`

  //http://api.nbp.pl/api/exchangerates/tables/{table}/
  //http://api.nbp.pl/api/exchangerates/tables/{table}/{date}/
  //RRRR-MM-DD
  loadList(tableType: TableTypeEnum, params: CurrencyListParams, date?: Date): Observable<CurrencyTableData[]> {
    let urlString = `${this.routeUrl}/tables/${tableType}`
    if (!!date) {
      urlString += `/${date}`;
    }
    const paramsString = createParamsString(params);
    return this.http.get<CurrencyTableData[]>(`${urlString}${paramsString}`)
  }
}
