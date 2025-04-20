const nodemailer = require('nodemailer');

module.exports = async (to, subject, text) => {
  // Cria conta de teste Ethereal
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  let info = await transporter.sendMail({
    from: '"Sistema Teste" <no-reply@teste.com>',
    to,
    subject,
    text,
  });

  console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // Copie e acesse para ver o "e-mail" entregue :)
};
