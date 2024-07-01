import { CurrencyListParams } from '../../models/params';
import { TableTypeEnum } from '../../enums/table-type.enum';

export interface ListActionParams {
  tableType: TableTypeEnum,
  params: CurrencyListParams,
  date?: Date
}
