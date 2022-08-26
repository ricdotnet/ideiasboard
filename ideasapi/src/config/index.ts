import { config } from 'dotenv';

if ( process.env.NODE_ENV === 'production' ) {
  config();
} else {
  config({ path: '.env.development' });
}

export default {
  API: process.env.API,
  BASE: process.env.BASE,
  SECRET: process.env.SECRET,
  'MAILJET_API_KEY': process.env.MAILJET_API_KEY,
  'MAILJET_API_SECRET': process.env.MAILJET_API_SECRET,
  'MAILJET_API_EMAIL': process.env.MAILJET_API_EMAIL,
  'LOGIN_TEMPLATE': process.env.LOGIN_TEMPLATE,
};
