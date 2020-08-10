interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'kinghost'; // any driver you want

  host: string;
  port: number;

  auth: { user: string; pass: string };

  defaults: {
    from: { email: string; name: string };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),

  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },

  defaults: {
    from: {
      email: process.env.MAIL_DEFAULT_EMAIL || 'seeker@email.com.br',
      name: process.env.MAIL_DEFAULT_NAME || 'Seeker',
    },
  },
} as IMailConfig;
