import { IFolder } from '../models/folder.interface';

export const defaultFileSystem: IFolder = {
  name: '.',
  subFolders: [
    {
      name: 'desktop',
      subFolders: [],
      files: [],
    },
    {
      name: 'documents',
      subFolders: [
        {
          name: 'pictures',
          subFolders: [],
          files: [],
        },
        {
          name: 'videos',
          subFolders: [],
          files: [],
        },
      ],
      files: [],
    },
  ],
  files: [],
};
