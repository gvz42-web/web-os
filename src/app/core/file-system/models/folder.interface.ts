import { IFile } from './file.interface';

export interface IFolder {
  name: string;
  subFolders: IFolder[];
  files: IFile[];
}
