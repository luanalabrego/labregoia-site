// /api/contact.js  (Vercel Serverless Function)
import nodemailer from 'nodemailer';

export const config = { runtime: 'nodejs18.x' }; // força Node (não Edge)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, service, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Campos obrigatórios: name, email, message' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,         // smtp.gmail.com
      port: Number(process.env.SMTP_PORT), // 465
      secure: true,                        // 465 => TLS implícito
      auth: {
        user: process.env.SMTP_USER,       // contato@labregoia.com.br
        pass: process.env.SMTP_PASS,       // App Password
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    await transporter.verify(); // teste de handshake

    await transporter.sendMail({
      from: `Labrego IA <${process.env.SMTP_USER}>`, // use o mesmo do USER
      to: process.env.CONTACT_INBOX || process.env.SMTP_USER,
      replyTo: email,
      subject: `Novo contato: ${name}`,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Telefone: ${phone || '-'}`,
        `Empresa: ${company || '-'}`,
        `Serviço: ${service || '-'}`,
        '',
        (message || '').toString()
      ].join('\n'),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }
}
