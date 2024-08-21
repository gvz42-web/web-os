import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FileExplorerService } from '@apps/file-explorer/services/file-explorer.service';

@Component({
  selector: 'ws-folder-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './folder-context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderContextMenuComponent {
  fileExplorerService = inject(FileExplorerService);

  folderName = input.required<string>();

  deleteFolder() {
    this.fileExplorerService.deleteFolder(this.folderName);
  }
}
