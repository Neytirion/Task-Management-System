export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f9; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #6a11cb, #2575fc); padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Verify Your Email</h1>
    </div>
    <div style="padding: 24px;">
      <p style="margin: 0 0 16px;">Hello,</p>
      <p style="margin: 0 0 24px;">Thank you for signing up! Your verification code is:</p>
      <div style="text-align: center; margin: 32px 0;">
        <span style="font-size: 36px; font-weight: 600; letter-spacing: 6px; color: #2575fc;">{verificationCode}</span>
      </div>
      <p>This code is valid for 15 minutes. If you didn’t create an account, you can safely ignore this email.</p>
      <p style="margin-top: 32px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; background-color: #f1f1f1; padding: 16px; font-size: 12px; color: #999;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f9; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #00b09b, #96c93d); padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Successful</h1>
    </div>
    <div style="padding: 24px;">
      <p>Hello,</p>
      <p>Your password has been successfully changed.</p>
      <div style="text-align: center; margin: 32px 0;">
        <div style="background-color: #00b09b; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; font-size: 32px; display: inline-block;">✓</div>
      </div>
      <p>If this wasn’t you, please contact our support team immediately.</p>
      <p>Security tips:</p>
      <ul style="margin-left: 20px;">
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication</li>
        <li>Avoid using the same password on multiple platforms</li>
      </ul>
      <p style="margin-top: 32px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; background-color: #f1f1f1; padding: 16px; font-size: 12px; color: #999;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f9; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #ff512f, #dd2476); padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Reset Your Password</h1>
    </div>
    <div style="padding: 24px;">
      <p>Hello,</p>
      <p>We received a request to reset your password. If this wasn't you, simply ignore this message.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="{resetURL}" style="background-color: #ff512f; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Reset Password</a>
      </div>
      <p>This link is valid for 1 hour.</p>
      <p style="margin-top: 32px;">Best regards,<br><strong>Your App Team</strong></p>
    </div>
    <div style="text-align: center; background-color: #f1f1f1; padding: 16px; font-size: 12px; color: #999;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
