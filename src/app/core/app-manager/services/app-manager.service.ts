import { Injectable, signal } from '@angular/core';
import { apps } from '../../../apps.registry';
import { IRunningApp } from '../models/app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppManagerService {
  allApps = apps;

  runningApps = signal<IRunningApp[]>([]);

  runApp(appId: string, data?: unknown) {
    const app = this.allApps.find(app => app.appId === appId);
    if (app) {
      this.runningApps.update(apps => [
        ...apps,
        { ...app, isMinimized: false, data },
      ]);
    }
  }

  toggleMinimizeApp(appId: string) {
    this.runningApps.update(apps =>
      apps.map(app =>
        app.appId === appId ? { ...app, isMinimized: !app.isMinimized } : app
      )
    );
  }

  focusApp(appId: string) {
    this.runningApps.update(apps => {
      return apps.sort(a => (a.appId === appId ? 1 : -1));
    });
  }

  closeApp(appId: string) {
    this.runningApps.update(apps => apps.filter(app => app.appId !== appId));
  }
}
