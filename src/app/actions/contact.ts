'use server';

import nodemailer from 'nodemailer';

interface ContactData {
    name: string;
    email: string;
    message: string;
}

export async function sendContactEmail(data: ContactData) {
    const { name, email, message } = data;

    // Check for environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP credentials missing. Email will not be sent.');
        // In development, we might want to just log it and pretend it worked
        // so the UI doesn't break for the user immediately if they haven't set env vars yet.
        // But for "implementation", we should try to send.

        // For now, I'll return a specific error so the user knows they need to set env vars.
        return {
            success: false,
            error: 'Email service not configured (Missing SMTP_USER/SMTP_PASS)'
        };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: 'asmmisfar@gmail.com',
            subject: `Flexiana AI Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #333;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
        </div>
      `
        });

        return { success: true };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error: 'Failed to send email. Please try again later.' };
    }
}
