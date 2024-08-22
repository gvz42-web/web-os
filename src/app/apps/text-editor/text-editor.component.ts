import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WS_APP_DATA } from '@core/app-manager/app-tokens';
import { JsonPipe } from '@angular/common';
import { IFile } from '@core/file-system/models/file.interface';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ws-text-editor',
  standalone: true,
  imports: [JsonPipe, MatButton],
  templateUrl: './text-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent {
  file = inject<IFile>(WS_APP_DATA);
}
