export type EmailTemplates<T extends string> = { [key in T]: { [key in 'en']: number } };

export interface EmailData<T> {
  to: {
    email: string;
    name: string;
  };
  template: number;
  variables: {
    [K in keyof T]: T[K];
  };
}

export interface EmailMessage {
  'from': {
    email: string;
  };
  to: any[];
  templateID: number;
  templateLanguage: boolean;
  variables: object;
}
