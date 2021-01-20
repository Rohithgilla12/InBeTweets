declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    CONSUMER_KEY: string;
    CONSUMER_SECRET: string;
    ACCESS_TOKEN: string;
    ACCESS_TOKEN_SECRET: string;
  }
}
