import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyRate } from '../../models/currency-rate';

@Component({
  selector: 'app-currency-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyTableComponent {
  @Input() currencyList: CurrencyRate[];
}
