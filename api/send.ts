// Vercel / Netlify Serverless Function for Resend Email Delivery
export default async function handler(req: any, res: any) {
  // Set CORS headers for preflight and API requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, service, message, source } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY environment variable is not configured on the server.' });
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Inquiry <onboarding@resend.dev>',
        to: ['sathiyasankar0107@gmail.com'],
        reply_to: email,
        subject: `[Portfolio Inquiry] ${name} — ${service || 'General Message'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #2563eb; margin: 0; font-size: 20px;">New Portfolio Inquiry</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received via Sathiya Sankar's Engineering Portfolio</p>
            </div>

            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f1f5f9;">
              <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Sender Name:</strong> ${name}</p>
              <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
              <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Service / Scope:</strong> ${service || 'General Inquiry'}</p>
              <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Submission Channel:</strong> ${source === 'chat_assistant' ? 'AI Chat Assistant' : 'Website Contact Form'}</p>
            </div>

            <h3 style="color: #0f172a; font-size: 15px; margin: 0 0 8px 0;">Message:</h3>
            <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; color: #1e293b; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${message}</div>

            <p style="color: #94a3b8; font-size: 11px; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              Delivered reliably via Resend Email API • Reply directly to this email to contact the sender.
            </p>
          </div>
        `,
      }),
    });

    const data = await resendRes.json();
    return res.status(resendRes.status).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'An unexpected error occurred while delivering email via Resend.' });
  }
}
