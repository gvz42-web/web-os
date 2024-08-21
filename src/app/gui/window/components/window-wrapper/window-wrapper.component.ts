import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { WindowComponent } from '../window/window.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AppManagerService } from '../../../../core/app-manager/services/app-manager.service';

@Component({
  selector: 'ws-window-wrapper',
  standalone: true,
  templateUrl: './window-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WindowComponent, CdkDrag],
})
export class WindowWrapperComponent {
  private readonly appManager = inject(AppManagerService);

  openedApps = computed(() => this.appManager.runningApps());

  focusApp(appId: string) {
    this.appManager.focusApp(appId);
  }

  minimizeApp(appId: string) {
    this.appManager.toggleMinimizeApp(appId);
  }

  closeApp(appId: string) {
    this.appManager.closeApp(appId);
  }
}
