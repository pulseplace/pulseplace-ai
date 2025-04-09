
/**
 * Provides access to email templates for Mailchimp integration
 */
export const MailchimpTemplates = {
  /**
   * Gets the welcome email HTML template designed for Mailchimp with merge tags
   * 
   * @returns The HTML template as a string
   */
  getWelcomeTemplate: async (): Promise<string> => {
    try {
      // In a server environment, we would read from filesystem
      // For the browser, we'll fetch from the public assets
      return fetch('/email-templates/mailchimpWelcomeTemplate.html')
        .then(response => response.text())
        .catch(fetchError => {
          console.error('Error fetching Mailchimp template:', fetchError);
          throw new Error('Failed to load Mailchimp welcome template');
        });
    } catch (error) {
      console.error('Error reading Mailchimp template:', error);
      throw new Error('Failed to retrieve Mailchimp welcome template');
    }
  }
};

/**
 * Exports the Mailchimp template HTML as a string for direct use
 * This is useful for copying the template into Mailchimp
 * 
 * @returns The raw HTML template string
 */
export const getMailchimpWelcomeHtml = (): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PulsePlace.ai</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      color: #1A1F2C;
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .logo {
      width: 180px;
      margin-bottom: 20px;
    }
    
    h1 {
      color: #6E59A5;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #333;
    }
    
    .highlight {
      color: #9B87F5;
      font-weight: 600;
    }
    
    .button {
      display: block;
      width: fit-content;
      margin: 30px auto;
      padding: 14px 32px;
      background: linear-gradient(135deg, #9B87F5 0%, #7E69AB 100%);
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      border-radius: 50px;
      text-align: center;
      transition: transform 0.3s ease;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(126, 105, 171, 0.2);
    }
    
    .footer {
      margin-top: 40px;
      text-align: center;
      color: #666;
      font-size: 14px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-link {
      display: inline-block;
      margin: 0 10px;
    }
    
    @media only screen and (max-width: 600px) {
      .container {
        padding: 30px 15px;
      }
      
      h1 {
        font-size: 24px;
      }
      
      p {
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://pulseplace.ai/logo-dark.png" alt="PulsePlace.ai Logo" class="logo">
      <h1>Welcome to PulsePlace.ai, *|FNAME|*!</h1>
    </div>
    
    <p>Hello <span class="highlight">*|FNAME|* *|LNAME|*</span>,</p>
    
    <p>Thank you for joining PulsePlace.ai! We're thrilled to have you on board and excited to help you build a more resilient workplace through AI-powered insights.</p>
    
    <p>Your account has been created with <span class="highlight">*|EMAIL|*</span> and is now ready to use. Get started by exploring your dashboard and setting up your first team survey.</p>
    
    <p>Here's what you can do next:</p>
    <ul>
      <li>Complete your company profile</li>
      <li>Set up your first pulse survey</li>
      <li>Invite team members to your workspace</li>
      <li>Explore the certification engine</li>
    </ul>
    
    <a href="https://pulseplace.ai/dashboard" class="button">Access Your Dashboard</a>
    
    <p>If you have any questions or need assistance getting started, please reply to this email or contact our support team at <a href="mailto:support@pulseplace.ai">support@pulseplace.ai</a>.</p>
    
    <p>We look forward to partnering with you on your journey to create a more trust-centered workplace!</p>
    
    <div class="footer">
      <p>PulsePlace.ai &copy; *|CURRENT_YEAR|* | Redefining workplace trust through data & AI</p>
      
      <div class="social-links">
        <a href="https://linkedin.com/company/pulseplace-ai" class="social-link">LinkedIn</a>
        <a href="https://twitter.com/pulseplace_ai" class="social-link">Twitter</a>
      </div>
      
      <p>
        <small>
          You're receiving this email because you signed up for PulsePlace.ai.<br>
          If you'd prefer not to receive emails like this, you can <a href="*|UNSUB|*">unsubscribe</a>.
        </small>
      </p>
    </div>
  </div>
</body>
</html>`;
};
