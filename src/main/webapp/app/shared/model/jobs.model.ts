export interface IJobs {
  id?: number;
  name?: string;
  description?: string | null;
}

export const defaultValue: Readonly<IJobs> = {};
