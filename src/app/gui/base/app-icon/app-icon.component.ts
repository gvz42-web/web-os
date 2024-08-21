import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { IApp } from '../../../core/app-manager/models/app.interface';

@Component({
  selector: 'ws-app-icon',
  standalone: true,
  imports: [MatTooltip],
  host: {
    class: 'contents',
  },
  templateUrl: './app-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIconComponent {
  app = input.required<IApp>();
  opened = input(false);
}
