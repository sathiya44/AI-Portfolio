export interface ContactPayload {
  name: string;
  email: string;
  service?: string;
  message: string;
  source?: 'contact_page' | 'chat_assistant';
}

export interface SendEmailResult {
  success: boolean;
  message: string;
  id?: string;
}

/**
 * Sends a verified contact inquiry to Sathiya Sankar's inbox via Resend.
 * Primary route: /api/send (served by Vite server middleware locally, Vercel/Netlify in production).
 * Secondary fallback: direct client API if direct CORS or proxy is available.
 */
export async function sendEmailViaResend(payload: ContactPayload): Promise<SendEmailResult> {
  const { name, email, service = 'General Inquiry', message, source = 'contact_page' } = payload;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return {
      success: false,
      message: 'Please fill in your name, email address, and message.',
    };
  }

  // 1. Primary path: Internal Serverless / Dev API route (/api/send)
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        service: service.trim(),
        message: message.trim(),
        source,
      }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.id) {
      return {
        success: true,
        message: 'Your message has been delivered directly to Sathiya Sankar via Resend! He will review it and reply to your email promptly.',
        id: data.id,
      };
    }

    if (data?.error) {
      throw new Error(data.error);
    }
  } catch (err: any) {
    console.warn('API /api/send route attempt failed:', err.message);

    // 2. Client-side fallback if /api/send is not routed (e.g., pure static preview host)
    const clientApiKey = import.meta.env.VITE_RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    if (clientApiKey) {
      try {
        const directRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${clientApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Inquiry <onboarding@resend.dev>',
            to: ['sathiyasankar0107@gmail.com'],
            reply_to: email.trim(),
            subject: `[Portfolio Inquiry] ${name} — ${service}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #2563eb; margin-top: 0;">New Portfolio Inquiry</h2>
                <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                <p><strong>Topic / Role:</strong> ${service}</p>
                <p><strong>Channel:</strong> ${source === 'chat_assistant' ? 'AI Chat Assistant' : 'Contact Form'}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <h4 style="margin-bottom: 8px;">Message:</h4>
                <p style="white-space: pre-wrap; line-height: 1.6; color: #334155;">${message}</p>
              </div>
            `,
          }),
        });

        const directData = await directRes.json().catch(() => null);
        if (directRes.ok && directData?.id) {
          return {
            success: true,
            message: 'Your message has been delivered directly to Sathiya Sankar via Resend!',
            id: directData.id,
          };
        }
      } catch (directErr: any) {
        console.warn('Direct Resend fetch fallback also blocked:', directErr.message);
      }
    }

    return {
      success: false,
      message: err.message || 'Could not deliver email. Please reach out directly to sathiyasankar0107@gmail.com.',
    };
  }

  return {
    success: false,
    message: 'Could not connect to email delivery service. Please email sathiyasankar0107@gmail.com directly.',
  };
}
