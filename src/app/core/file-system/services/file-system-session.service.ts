import { computed, inject, Injectable, signal } from '@angular/core';
import { FileSystemService } from './file-system.service';

@Injectable()
export class FileSystemSessionService {
  private readonly fileSystem = inject(FileSystemService);

  currentPath = signal<string[]>([]);

  currentFolder = computed(() => {
    return this.fileSystem.getDirectory(this.currentPath());
  });

  openFolder(path: string[]) {
    this.currentPath.set(path);
  }

  toFolder(folderName: string) {
    this.currentPath.update(path => [...path, folderName]);
  }

  up() {
    this.currentPath.update(path => path.slice(0, path.length - 1));
  }

  createFolder(name: string) {
    this.fileSystem.createFolder(this.currentPath(), name);
  }

  deleteFolder(name: string) {
    this.fileSystem.deleteFolder(this.currentPath(), name);
  }

  createFile(name: string) {
    this.fileSystem.createFile(this.currentPath(), name, '');
  }

  deleteFile(name: string) {
    this.fileSystem.deleteFile(this.currentPath(), name);
  }
}
