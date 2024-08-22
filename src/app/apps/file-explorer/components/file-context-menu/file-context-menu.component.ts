import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FileExplorerService } from '@apps/file-explorer/services/file-explorer.service';

@Component({
  selector: 'ws-file-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './file-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileContextMenuComponent {
  fileExplorerService = inject(FileExplorerService);
  name = input.required<string>();

  deleteFile() {
    this.fileExplorerService.deleteFile(this.name);
  }
}
