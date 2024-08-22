export interface IApp {
  appId: string;
  name: string;
  iconUrl: string;
  loadComponent: () => Promise<unknown>;
  defaultSize?: {
    width: number;
    height: number;
  };
}

export type IRunningApp = IApp & {
  isMinimized: boolean;
  data?: unknown;
};
