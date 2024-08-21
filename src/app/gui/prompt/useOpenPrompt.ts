import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { PromptComponent } from './components/prompt/prompt.component';
import { Observable } from 'rxjs';

interface PromptInput {
  label?: string;
  placeholder?: string;
  formControl: FormControl;
}

export type PromptActionType = 'submit' | 'cancel';

interface PromptAction {
  type: PromptActionType;
  label: string;
}

export interface PromptConfig {
  title: string;
  text?: string;
  inputs?: PromptInput[];
  actions?: PromptAction[];
}

export const useOpenPrompt = () => {
  const matDialog = inject(MatDialog);

  return (config: PromptConfig): Observable<PromptActionType> => {
    return matDialog
      .open(PromptComponent, {
        panelClass: 'prompt-dialog',
        data: config,
        backdropClass: 'prompt-backdrop',
      })
      .afterClosed();
  };
};
