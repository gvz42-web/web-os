import { effect, Injectable, signal } from '@angular/core';
import { useLocalStorage } from '@utils/use-local-storage';
import { IFolder } from '../models/folder.interface';
import { defaultFileSystem } from '../default/default-fs';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  private readonly localStorage = useLocalStorage();
  private readonly fs = signal(
    this.localStorage.getItem<IFolder | undefined>('fs') || defaultFileSystem
  );

  constructor() {
    effect(() => {
      this.localStorage.setItem('fs', this.fs());
    });
  }

  getDirectory(pathParts: string[]) {
    if (pathParts.length === 1 && pathParts[0] === '.') {
      return this.fs();
    }

    let current: IFolder | undefined = this.fs();

    for (const part of pathParts) {
      if (part === '.') {
        continue;
      }
      current = current?.subFolders.find(folder => folder.name === part);
    }
    return current;
  }

  getFile(pathParts: string[]) {
    const folder = this.getDirectory(pathParts.slice(0, pathParts.length - 1));

    return folder?.files.find(
      file => file.name === pathParts[pathParts.length - 1]
    );
  }

  createFile(pathParts: string[], name: string, data: string) {
    const folder = this.getDirectory(pathParts);
    folder?.files.push({ name, data, dateCreated: new Date() });
    this.updateFS();
  }

  deleteFile(pathParts: string[], name: string) {
    const folder = this.getDirectory(pathParts);
    if (folder) {
      folder.files = folder.files.filter(file => file.name !== name);
      this.updateFS();
    }
  }

  createFolder(pathParts: string[], name: string) {
    const folder = this.getDirectory(pathParts);
    folder?.subFolders.push({ name, subFolders: [], files: [] });
    this.updateFS();
  }

  deleteFolder(pathParts: string[], name: string) {
    const folder = this.getDirectory(pathParts);
    if (folder) {
      folder.subFolders = folder.subFolders.filter(
        folder => folder.name !== name
      );
    }
    this.updateFS();
  }

  private updateFS() {
    this.fs.update(fs => ({ ...fs }));
  }
}
