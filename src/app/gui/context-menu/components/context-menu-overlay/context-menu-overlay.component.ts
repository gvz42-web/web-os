import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ContextMenuService } from '../../services/context-menu.service';
import { NgComponentOutlet, NgStyle, NgTemplateOutlet } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ws-context-menu-overlay',
  standalone: true,
  templateUrl: './context-menu-overlay.component.html',
  host: {
    class: 'contents',
  },
  animations: [
    trigger('contextMenuAnimation', [
      transition(':enter', [
        style({
          transform: 'scale(0)',
        }),
        animate('0.1s ease-in', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('0.1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, NgTemplateOutlet, NgStyle],
  encapsulation: ViewEncapsulation.None,
})
export class ContextMenuOverlayComponent {
  private readonly contextMenuService = inject(ContextMenuService);

  config = this.contextMenuService.config;

  close() {
    this.contextMenuService.closeMenu();
  }
}
