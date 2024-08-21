import { Injectable, signal, TemplateRef } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

interface ContextMenuConfig {
  position: Position;
  template: TemplateRef<unknown>;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  private contextMenuConfig = signal<ContextMenuConfig | null>(null);
  public config = this.contextMenuConfig.asReadonly();

  openMenu(template: TemplateRef<unknown>, position: Position, data?: any) {
    this.contextMenuConfig.set({
      template,
      position,
      data,
    });
  }

  closeMenu() {
    this.contextMenuConfig.set(null);
  }
}
