import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - email functionality will not work");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export interface InterestRegistrationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  startupName: string;
  hqLocation: string;
  companyWebsite?: string | null;
  currentStatus?: string | null;
  areasOfInterest?: string | null;
}

export async function sendInterestRegistrationEmail(data: InterestRegistrationEmailData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY not set — interest registration email not sent");
    return false;
  }

  try {
    const msg = {
      to: 'h.froushan@ucledtechlabs.com',
      from: 'info@ucledtechlabs.com',
      replyTo: data.email,
      subject: `New Interest Registration — ${data.startupName}`,
      text: `
New Interest Registration

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Startup: ${data.startupName}
HQ Location: ${data.hqLocation}
${data.companyWebsite ? `Website: ${data.companyWebsite}` : ''}
${data.currentStatus ? `Current Status: ${data.currentStatus}` : ''}
${data.areasOfInterest ? `\nChallenge / Areas of Interest:\n${data.areasOfInterest}` : ''}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e57c00; border-bottom: 2px solid #e57c00; padding-bottom: 10px;">
            New Interest Registration
          </h2>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Startup:</strong> ${data.startupName}</p>
            <p><strong>HQ Location:</strong> ${data.hqLocation}</p>
            ${data.companyWebsite ? `<p><strong>Website:</strong> <a href="${data.companyWebsite}">${data.companyWebsite}</a></p>` : ''}
            ${data.currentStatus ? `<p><strong>Current Status:</strong> ${data.currentStatus}</p>` : ''}
          </div>

          ${data.areasOfInterest ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Challenge / Areas of Interest:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #e57c00; border-radius: 5px;">
              ${data.areasOfInterest.replace(/\n/g, '<br>')}
            </div>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Submitted via UCL EdTech Labs interest registration form.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error: any) {
    console.error('SendGrid interest registration email error:', error);
    if (error?.response?.body?.errors) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body.errors));
    }
    return false;
  }
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("Email service not configured - SENDGRID_API_KEY missing");
  }

  try {
    const msg = {
      to: 'info@ucledtechlabs.com',
      from: 'info@ucledtechlabs.com', // Verified Single Sender in SendGrid
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #0066cc; border-radius: 5px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This message was sent via the UCL EdTech Labs contact form.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error?.response?.body?.errors) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body.errors));
    }
    return false;
  }
}