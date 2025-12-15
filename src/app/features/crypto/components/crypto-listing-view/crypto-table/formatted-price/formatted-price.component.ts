import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { formatSmallNumber } from '../../../../../../core/utils/format-small-number';

const SMALL_NUMBER_THRESHOLD = 0.01;
const DEFAULT_FORMATTED_VALUE = { zeroCount: 0, significant: '-' };

@Component({
  selector: 'app-formatted-price',
  imports: [DecimalPipe],
  templateUrl: './formatted-price.component.html',
  styleUrl: './formatted-price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormattedPriceComponent {
  readonly value = input<number | null | undefined>();

  protected readonly hasValue = computed(() => {
    const val = this.value();
    return val !== null && val !== undefined;
  });

  protected readonly isLargeNumber = computed(() => {
    const val = this.value();
    return val !== null && val !== undefined && val >= SMALL_NUMBER_THRESHOLD;
  });

  protected readonly formattedSmallNumber = computed(() => {
    const val = this.value();
    if (val === null || val === undefined || val >= SMALL_NUMBER_THRESHOLD) {
      return DEFAULT_FORMATTED_VALUE;
    }
    return formatSmallNumber(val) ?? DEFAULT_FORMATTED_VALUE;
  });

  protected readonly displayValue = computed(() => {
    return this.value() ?? null;
  });
}
