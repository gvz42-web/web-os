import { Injectable, signal, TemplateRef } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  template = signal<TemplateRef<unknown> | null>(null);
  position = signal<Position | null>(null);

  openMenu(template: TemplateRef<unknown>, position: Position) {
    this.position.set(position);
    this.template.set(template);
  }

  closeMenu() {
    this.template.set(null);
    this.position.set(null);
  }
}
