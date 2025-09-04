const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { name, email, phone, company, service, message } = req.body || {};

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
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
