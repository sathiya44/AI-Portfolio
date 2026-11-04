import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite development server proxy plugin for Resend email delivery
function resendDevServerPlugin(apiKey: string): Plugin {
  return {
    name: 'resend-dev-server-proxy',
    configureServer(server) {
      server.middlewares.use('/api/send', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { name, email, service, message, source } = data;

            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Name, email, and message are required' }));
              return;
            }

            const activeKey = apiKey || process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
            if (!activeKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'RESEND_API_KEY is not defined in .env' }));
              return;
            }

            const resendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${activeKey}`,
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

            const resData = await resendRes.json();
            res.statusCode = resendRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(resData));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Server error delivering email' }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const resendApiKey = env.RESEND_API_KEY || env.VITE_RESEND_API_KEY || '';

  return {
    base: './',
    envPrefix: ['VITE_', 'RESEND_'],
    plugins: [
      react(),
      resendDevServerPlugin(resendApiKey),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            markdown: ['react-markdown', 'remark-gfm'],
          },
        },
      },
    },
  };
});
