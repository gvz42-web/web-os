import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AppIconComponent } from '@gui/base/app-icon/app-icon.component';
import { AppManagerService } from '@core/app-manager/services/app-manager.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ws-bar',
  standalone: true,
  imports: [AppIconComponent, NgClass],
  templateUrl: './bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent {
  private readonly appManager = inject(AppManagerService);

  allApps = this.appManager.allApps;

  runningAppIds = computed(() =>
    this.appManager.runningApps().map(app => app.appId)
  );

  openApp(appId: string) {
    if (this.runningAppIds().includes(appId)) {
      this.appManager.toggleMinimizeApp(appId);
    } else {
      this.appManager.runApp(appId);
    }
  }
}
