declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      SECRET: string;
      API: string;
      BASE: string;
      MAILJET_API_SECRET: string;
      MAILJET_API_KEY: string;
      MAILJET_API_EMAIL: string;
      LOGIN_TEMPLATE: number; // temp
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
