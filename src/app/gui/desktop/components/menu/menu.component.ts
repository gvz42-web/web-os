import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
import { DatePipe } from '@angular/common';

const compareTimes = (date1: Date, date2: Date) =>
  date1.getMinutes() === date2.getMinutes();

@Component({
  selector: 'ws-menu',
  standalone: true,
  imports: [DatePipe],
  host: {
    class: 'contents',
  },
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  time = toSignal(interval(1000).pipe(map(() => new Date())), {
    initialValue: new Date(),
    equal: compareTimes,
  });
}
