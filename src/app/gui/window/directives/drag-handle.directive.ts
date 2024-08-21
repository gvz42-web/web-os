import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';

@Directive({
  selector: '[wsDragHandle]',
  standalone: true,
})
export class DragHandleDirective {
  private readonly elementRef = inject(ElementRef);

  private isDragging = false;

  private initialX = 0;
  private initialY = 0;

  private startX = 0;
  private startY = 0;

  public position = signal({ x: 0, y: 0 });

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;

    this.startX = event.clientX;
    this.startY = event.clientY;

    const elementRect = this.elementRef.nativeElement.getBoundingClientRect();

    this.initialX = elementRect.left;
    this.initialY = elementRect.top;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY - 24;

    this.position.set({ x: this.initialX + dx, y: this.initialY + dy });
  }

  @HostListener('document:mouseup') onMouseUp(): void {
    this.isDragging = false;
  }
}
