import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarComponent } from './components/bar/bar.component';
import { NgStyle } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatButton } from '@angular/material/button';
import { WindowWrapperComponent } from '../window/components/window-wrapper/window-wrapper.component';
import { ContextMenuOverlayComponent } from '../context-menu/components/context-menu-overlay/context-menu-overlay.component';

@Component({
  selector: 'ws-desktop',
  standalone: true,
  imports: [
    BarComponent,
    NgStyle,
    MenuComponent,
    CdkDrag,
    CdkDragHandle,
    MatButton,
    WindowWrapperComponent,
    ContextMenuOverlayComponent,
  ],
  templateUrl: './desktop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopComponent {}
