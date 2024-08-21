import { IApp } from '@core/app-manager/models/app.interface';

export const apps: IApp[] = [
  {
    name: 'Text app',
    appId: 'textApp',
    iconUrl: 'assets/app-icons/default.svg',
    defaultSize: {
      width: 400,
      height: 400,
    },
    loadComponent: () =>
      import('./apps/text-app/text-app.component').then(
        m => m.TextAppComponent
      ),
  },
  {
    name: 'Counter',
    appId: 'counter',
    iconUrl: 'assets/app-icons/default.svg',
    loadComponent: () =>
      import('./apps/counter/counter.component').then(m => m.CounterComponent),
  },
  {
    name: 'File explorer',
    appId: 'fileExplorer',
    iconUrl: 'assets/app-icons/file-manager.svg',
    loadComponent: () =>
      import('./apps/file-explorer/file-explorer.component').then(
        m => m.FileExplorerComponent
      ),
  },
];
