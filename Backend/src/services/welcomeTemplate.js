// utils/welcomeTemplate.js

function welcomeEmailTemplate({ name, username, password, loginUrl }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Welcome to the Team!</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f7f9fc; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; padding-bottom: 20px; }
        .header h1 { color: #007bff; }
        .welcome-msg { font-size: 16px; line-height: 1.6; }
        .credentials { background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .login-button { display: inline-block; background-color: #007bff; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; }
        .footer { margin-top: 40px; font-size: 12px; color: #777; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Mr.PK pvt. Ltd. 🎉</h1>
        </div>
        <div class="welcome-msg">
          <p>Hi <strong>${name}</strong>,</p>
          <p>We’re excited to have you onboard!</p>
          <p>Below are your login credentials:</p>
        </div>
        <div class="credentials">
          <p><strong>Username:</strong> <code>${username}</code></p>
          <p><strong>Password:</strong> <code>${password}</code></p>
        </div>
        <p>Click below to login to your panel:</p>
        <div style="text-align:center;">
          <a href="${loginUrl}" class="login-button">Login to Employee Panel</a>
        </div>
        <div class="footer">
          <p>If you have questions, reach out to HR.</p>
          <p>© ${new Date().getFullYear()} Mr.PK pvt. Ltd.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = { welcomeEmailTemplate };
