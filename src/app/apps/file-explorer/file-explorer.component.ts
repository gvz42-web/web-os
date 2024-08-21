import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FileSystemSessionService } from '@core/file-system/services/file-system-session.service';
import { MatButton } from '@angular/material/button';
import { ContextMenuDirective } from '@gui/context-menu/directives/context-menu.directive';
import { useOpenPrompt } from '@gui/prompt/useOpenPrompt';
import { FormControl } from '@angular/forms';
import { rxMethod } from '@utils/rx-method';
import { pipe, switchMap } from 'rxjs';
import { tapResult } from '@utils/tap-result';
import { CommonContextMenuComponent } from './components/common-context-menu/common-context-menu.component';

@Component({
  selector: 'ws-file-explorer',
  standalone: true,
  providers: [FileSystemSessionService],
  templateUrl: './file-explorer.component.html',
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, ContextMenuDirective],
})
export class FileExplorerComponent {
  private readonly fsSession = inject(FileSystemSessionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  currentFolder = this.fsSession.currentFolder;
  currentPath = this.fsSession.currentPath;

  openPrompt = useOpenPrompt();

  constructor() {
    this.fsSession.openFolder(['.']);
  }

  openFolder(folder: string) {
    this.fsSession.toFolder(folder);
  }

  up() {
    this.fsSession.up();
  }

  createFolder = rxMethod<void>(
    pipe(
      switchMap(() => {
        const folderName = new FormControl('New folder');

        return this.openPrompt({
          title: 'Create a new folder',
          inputs: [
            {
              placeholder: 'Give it a name',
              formControl: folderName,
            },
          ],
          actions: [
            {
              label: 'Create',
              type: 'submit',
            },
            {
              label: 'Cancel',
              type: 'cancel',
            },
          ],
        }).pipe(
          tapResult(action => {
            const name = folderName.getRawValue();
            if (action === 'submit' && name) {
              this.fsSession.createFolder(name);
              this.changeDetectorRef.detectChanges();
            }
          })
        );
      })
    )
  );
}
