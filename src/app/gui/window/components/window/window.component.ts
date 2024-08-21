import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { IRunningApp } from '@core/app-manager/models/app.interface';
import { NgComponentOutlet, NgStyle } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { WDraggableDirective } from '../../directives/draggable.directive';
import { DragHandleDirective } from '../../directives/drag-handle.directive';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'ws-window',
  standalone: true,
  imports: [
    CdkDragHandle,
    CdkDrag,
    NgComponentOutlet,
    WDraggableDirective,
    DragHandleDirective,
    NgStyle,
    CdkScrollable,
  ],
  templateUrl: './window.component.html',
  host: {
    class: 'contents',
  },
  animations: [
    trigger('minimize', [
      state(
        'true',
        style({
          transform: 'scale(0) translateX(-50%)',
          top: '100vh',
          left: '50%',
        })
      ),
      state('false', style({ transform: 'scale(1)' })),
      transition('true <=> false', [animate('0.2s')]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent {
  app = input.required<IRunningApp>();
  component = signal<any>(undefined);

  closeApp = output<void>();
  focusApp = output<void>();
  minimizeApp = output<void>();

  constructor() {
    effect(() => {
      this.app()
        .loadComponent()
        .then(component => this.component.set(component));
    });
  }

  close() {
    this.closeApp.emit();
  }
}
