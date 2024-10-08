import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FileSystemSessionService } from '@core/file-system/services/file-system-session.service';
import { MatButton } from '@angular/material/button';
import { ContextMenuDirective } from '@gui/context-menu/directives/context-menu.directive';
import { CommonContextMenuComponent } from './components/common-context-menu/common-context-menu.component';
import { FileExplorerService } from '@apps/file-explorer/services/file-explorer.service';
import { FolderContextMenuComponent } from '@apps/file-explorer/components/folder-context-menu/folder-context-menu.component';
import { FileContextMenuComponent } from '@apps/file-explorer/components/file-context-menu/file-context-menu.component';
import { AppManagerService } from '@core/app-manager/services/app-manager.service';
import { IFile } from '@core/file-system/models/file.interface';

@Component({
  selector: 'ws-file-explorer',
  standalone: true,
  providers: [FileSystemSessionService, FileExplorerService],
  templateUrl: './file-explorer.component.html',
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,
    ContextMenuDirective,
    CommonContextMenuComponent,
    FolderContextMenuComponent,
    FileContextMenuComponent,
  ],
})
export class FileExplorerComponent {
  private readonly fsSession = inject(FileSystemSessionService);
  private readonly appManager = inject(AppManagerService);

  currentFolder = this.fsSession.currentFolder;
  currentPath = this.fsSession.currentPath;

  constructor() {
    this.fsSession.openFolder(['.']);
  }

  openFolder(folder: string) {
    this.fsSession.toFolder(folder);
  }

  openFile(file: IFile) {
    this.appManager.runApp('textEditor', file);
  }

  up() {
    this.fsSession.up();
  }
}
