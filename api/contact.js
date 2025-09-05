const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { name, email, phone, company, service, message } = req.body || {};

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  const requiredKeys = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
  const missingRequired = requiredKeys.filter((key) => !process.env[key]);
  const optionalMissing = ['SMTP_FROM'].filter((key) => !process.env[key]);

  if (missingRequired.length) {
    console.error('Missing required SMTP configuration keys:', missingRequired.join(', '));
    return res.status(500).json({ error: 'Email service not configured' });
  }

  if (optionalMissing.length) {
    console.warn('Missing optional SMTP configuration keys:', optionalMissing.join(', '));
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: 'contato@labregoia.com.br',
      subject: 'Novo contato do site',
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nEmpresa: ${company}\nServiço: ${service}\nMensagem: ${message}`
    });

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
