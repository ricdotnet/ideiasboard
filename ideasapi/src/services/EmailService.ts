import Mailjet from 'node-mailjet';
import config from '../config';

const mailjet = new Mailjet({
  apiKey: config.MAILJET_API_KEY,
  apiSecret: config.MAILJET_API_SECRET
});

// TODO: refactor the email sending business to allow for more email templates

export function sendEmail({ email, name, loginLink }: any): Promise<any> {
  const message = {
    'From': {
      'Email': config.MAILJET_API_EMAIL,
      'Name': 'IdeiasBoard',
    },
    'To': [
      {
        'Email': email,
        'Name': name
      }
    ],
    'TemplateID': Number(config.LOGIN_TEMPLATE),
    'TemplateLanguage': true,
    'Variables': {
      'emailAddress': email,
      'loginLink': loginLink
    }
  };

  const request = mailjet
    .post('send', { 'version': 'v3.1' })
    .request({ 'Messages': [message] });

  return new Promise((resolve, reject) => {
    request
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
