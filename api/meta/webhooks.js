const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;
const CRM_ENDPOINT = process.env.CRM_ENDPOINT;

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      if (CRM_ENDPOINT) {
        await fetch(CRM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body)
        });
      }
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Webhook forwarding error:', error);
      res.status(500).json({ error: 'Failed to forward webhook' });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
};
