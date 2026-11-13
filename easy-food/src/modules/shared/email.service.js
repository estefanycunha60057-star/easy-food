function buildTemplate({ header, body, footer }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2>${header}</h2>
      <div>${body}</div>
      <hr />
      <p style="color: #777; font-size: 12px;">${footer}</p>
    </div>
  `;
}

async function sendEmail({ to, toName, subject, header, body, footer }) {
  const html = buildTemplate({ header, body, footer });

  if (!process.env.EMAIL_API_KEY) {
    console.log(`[EMAIL SIMULADO] Para: ${toName || to} <${to}> | Assunto: ${subject}`);
    return { simulated: true, html };
  }

  console.log(`[EMAIL] Enviado para ${to} - "${subject}"`);
  return { sent: true };
}

module.exports = {
  sendEmail
};
