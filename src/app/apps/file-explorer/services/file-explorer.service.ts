import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { FileSystemSessionService } from '@core/file-system/services/file-system-session.service';
import { useOpenPrompt } from '@gui/prompt/useOpenPrompt';
import { rxMethod } from '@utils/rx-method';
import { pipe, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { tapResult } from '@utils/tap-result';

@Injectable()
export class FileExplorerService {
  private readonly fsSession = inject(FileSystemSessionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  openPrompt = useOpenPrompt();

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

  deleteFolder = rxMethod<string>(
    pipe(
      switchMap(name => {
        return this.openPrompt({
          title: `Delete folder ${name}?`,
          text: 'This action cannot be undone',
          actions: [
            {
              label: 'Yes',
              type: 'submit',
            },
            {
              label: 'Cancel',
              type: 'cancel',
            },
          ],
        }).pipe(
          tapResult(action => {
            if (action === 'submit') {
              this.fsSession.deleteFolder(name);
              this.changeDetectorRef.detectChanges();
            }
          })
        );
      })
    )
  );

  createFile = rxMethod<void>(
    pipe(
      switchMap(() => {
        const fileName = new FormControl('New file');

        return this.openPrompt({
          title: 'Create a new file',
          inputs: [
            {
              placeholder: 'Give it a name',
              formControl: fileName,
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
            const name = fileName.getRawValue();
            if (action === 'submit' && name) {
              this.fsSession.createFile(name);
              this.changeDetectorRef.detectChanges();
            }
          })
        );
      })
    )
  );

  deleteFile = rxMethod<string>(
    pipe(
      switchMap(name => {
        return this.openPrompt({
          title: `Delete file ${name}?`,
          text: 'This action cannot be undone',
          actions: [
            {
              label: 'Yes',
              type: 'submit',
            },
            {
              label: 'Cancel',
              type: 'cancel',
            },
          ],
        }).pipe(
          tapResult(action => {
            if (action === 'submit') {
              this.fsSession.deleteFile(name);
              this.changeDetectorRef.detectChanges();
            }
          })
        );
      })
    )
  );
}
