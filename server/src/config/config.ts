import * as Joi from '@hapi/joi';
import { join } from 'path';
import { config } from 'dotenv';

export type AuthenticationConfig = {
  accessToken: {
    lifetime: number;
    secret: string;
  };
  refreshToken: {
    lifetime: number;
    secret: string;
    headerName: string;
  };
};

export type Config = {
  authentication: AuthenticationConfig;
};

export const configValidationSchema = Joi.object({
  ACCESS_TOKEN_LIFETIME: Joi.number().required(),
  ACCESS_TOKEN_SECRET: Joi.string().min(20).required(),
  REFRESH_TOKEN_LIFETIME: Joi.number().required(),
  REFRESH_TOKEN_SECRET: Joi.string().min(20).required(),
  REFRESH_TOKEN_HEADER: Joi.string().required(),
});

config({ path: join(process.cwd(), 'src/config/.env') });

export const configuration = (): Config => ({
  authentication: {
    accessToken: {
      lifetime: parseInt(process.env.ACCESS_TOKEN_LIFETIME, 10),
      secret: process.env.ACCESS_TOKEN_SECRET,
    },
    refreshToken: {
      lifetime: parseInt(process.env.REFRESH_TOKEN_LIFETIME, 10),
      secret: process.env.REFRESH_TOKEN_SECRET,
      headerName: process.env.REFRESH_TOKEN_HEADER,
    },
  },
});
