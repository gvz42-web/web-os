import {
  Directive,
  HostListener,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { ContextMenuService } from '../services/context-menu.service';

@Directive({
  selector: '[wsContextMenu]',
  standalone: true,
})
export class ContextMenuDirective {
  contextMenuService = inject(ContextMenuService);

  wsContextMenu = input<TemplateRef<unknown>>();
  wsContextMenuData = input<any>();

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const menuTemplate = this.wsContextMenu();
    if (menuTemplate) {
      this.contextMenuService.openMenu(
        menuTemplate,
        {
          x: event.clientX,
          y: event.clientY,
        },
        this.wsContextMenuData()
      );
    }
  }

  @HostListener('document:pointerdown', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!target.closest('.context-menu')) {
      this.contextMenuService.closeMenu();
    }
  }
}
