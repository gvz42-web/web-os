import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FileExplorerService } from '@apps/file-explorer/services/file-explorer.service';

@Component({
  selector: 'ws-common-context-menu',
  standalone: true,
  templateUrl: './common-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonContextMenuComponent {
  fileExplorerService = inject(FileExplorerService);
}
