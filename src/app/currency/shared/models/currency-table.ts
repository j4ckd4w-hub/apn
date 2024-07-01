import { CurrencyRate } from './currency-rate';
import { TableTypeEnum } from '../enums/table-type.enum';

export interface CurrencyTableData {
  table: TableTypeEnum;
  no: string;
  tradingDate: Date;
  effectiveDate: Date;
  rates: CurrencyRate[];
}
