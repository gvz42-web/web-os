import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromptActionType, PromptConfig } from '../../useOpenPrompt';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ws-prompt',
  standalone: true,
  templateUrl: './prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButton],
})
export class PromptComponent {
  dialogRef = inject(MatDialogRef);
  config = inject<PromptConfig>(MAT_DIALOG_DATA);

  close(action: PromptActionType) {
    this.dialogRef.close(action);
  }
}
