const nodemailer = require('nodemailer');
const { CLIENT_ORIGIN } = require('../../config')
// const mg = require('nodemailer-mailgun-transport');
// The credentials for the email account you want to send mail from. 
const credentials = {
  secure: true,
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS 
    // These environment variables will be pulled from the .env file
    // apiKey: 'b61286bf9e28b149fac32220f0c7349f-e5e67e3e-00a38515',
    // domain: 'sandbox0b8a7f0ebcc74c0d8161304f24909bd2.mailgun.org'
  }
}

// Getting Nodemailer all setup with the credentials for when the 'sendEmail()'
// function is called.
const transporter = nodemailer.createTransport(credentials)

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
module.exports = async (to, content) => {
  
  // The from and to addresses for the email that is about to be sent.
  const contacts = {
    from: process.env.MAIL_USER,
    to // An array if you have multiple recipients.
    // subject: 'React Confirm Email',
    // html: `
    //   <a href='${CLIENT_ORIGIN}/confirm/${id}'>
    //     click to confirm email
    //   </a>
    // `,      
    // text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  }
  
  // Combining the content and contacts into a single object that can
  // be passed to Nodemailer.
  const email = Object.assign({}, content, contacts)
  
  // This file is imported into the controller as 'sendEmail'. Because 
  // 'transporter.sendMail()' below returns a promise we can write code like this
  // in the contoller when we are using the sendEmail() function.
  //
  //  sendEmail()
  //   .then(() => doSomethingElse())
  // 
  // If you are running into errors getting Nodemailer working, wrap the following 
  // line in a try/catch. Most likely is not loading the credentials properly in 
  // the .env file or failing to allow unsafe apps in your gmail settings.
  await transporter.sendMail(email, function(error, info){
    if(error)
      {
         return console.log(error);
      }
      else
      {
         return console.log(info.response);
      }      
  })

}