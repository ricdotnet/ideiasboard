import { sendEmail, Templates } from '../index';

interface Variables {
  emailAddress: string;
  loginLink: string;
}

export function sendLoginLink(emailAddress: string, loginLink: string): Promise<void> {
  return sendEmail<Variables>({
    to: {
      email: emailAddress,
      name: 'Ricardo Rocha'
    },
    template: Templates.loginLink.en,
    variables: {
      emailAddress,
      loginLink,
    }
  });
}
