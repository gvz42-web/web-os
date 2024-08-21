import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ws-counter',
  standalone: true,
  imports: [MatButton],
  templateUrl: './counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  counter = signal(0);

  increaseCounter() {
    this.counter.update(v => v + 1);
  }
}
