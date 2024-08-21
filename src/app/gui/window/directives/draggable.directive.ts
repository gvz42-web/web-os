import {
  contentChild,
  Directive,
  effect,
  ElementRef,
  inject,
} from '@angular/core';
import { DragHandleDirective } from './drag-handle.directive';

@Directive({
  selector: '[wsDraggable]',
  standalone: true,
})
export class WDraggableDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly handle = contentChild(DragHandleDirective);

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.style.position = 'absolute';
      this.elementRef.nativeElement.style.userSelect = 'none';
    });
    effect(() => {
      const position = this.handle()?.position();
      if (position) {
        this.elementRef.nativeElement.style.top = `${position.y}px`;
        this.elementRef.nativeElement.style.left = `${position.x}px`;
      }
    });
  }
}
