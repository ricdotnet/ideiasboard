import Mailjet from 'node-mailjet';
import config from '../config';
import { EmailData, EmailMessage } from '../types';

export { Templates } from './Templates';

const mailjet = new Mailjet({
  apiKey: config.MAILJET_API_KEY,
  apiSecret: config.MAILJET_API_SECRET
});

export async function sendEmail<T>(data: EmailData<T>): Promise<any> {
  const message: EmailMessage = {
    from: {
      email: (config.MAILJET_API_EMAIL as string),
    },
    to: [data.to],
    templateID: data.template,
    templateLanguage: true,
    variables: data.variables,
  };

  const request = mailjet
    .post('send', { 'version': 'v3.1' })
    .request({ 'Messages': [message] });

  try {
    const result = await request;
    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
