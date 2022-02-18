export interface ICitizenFolders {
  id?: number;
  name?: string;
  description?: string | null;
  special?: boolean;
}

export const defaultValue: Readonly<ICitizenFolders> = {
  special: false,
};
