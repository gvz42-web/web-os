import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileSystemSessionService } from '@core/file-system/services/file-system-session.service';

@Component({
  selector: 'ws-text-app',
  standalone: true,
  providers: [FileSystemSessionService],
  templateUrl: './text-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAppComponent {}
