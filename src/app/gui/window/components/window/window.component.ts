import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
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
import { WS_APP_DATA } from '@core/app-manager/app-tokens';

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
  private readonly injector = inject(Injector);

  app = input.required<IRunningApp>();
  component = signal<any>(undefined);

  componentInjector!: Injector;

  closeApp = output<void>();
  focusApp = output<void>();
  minimizeApp = output<void>();

  constructor() {
    effect(() => {
      this.app()
        .loadComponent()
        .then(component => this.component.set(component));

      this.componentInjector = Injector.create({
        providers: [
          {
            provide: WS_APP_DATA,
            useValue: this.app().data,
          },
        ],
        parent: this.injector,
      });
    });
  }

  close() {
    this.closeApp.emit();
  }
}
