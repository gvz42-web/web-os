import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesktopComponent } from '@gui/desktop/desktop.component';

@Component({
  selector: 'ws-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DesktopComponent],
  host: {
    class: 'fullscreen',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
