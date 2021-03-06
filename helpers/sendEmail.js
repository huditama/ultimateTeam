const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
function sendMail(target, text) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dummymamant@gmail.com", // generated ethereal user
            pass: "mamantmemangganteng" // generated ethereal password
        }
    });
    let email = `
    The market has been regenerated!
    SELL RATE: ${text}
    `

    let mailOptions = {
        from: '"UltimateTeam" <UltimateTeam@hacktiv8.com>', // sender address
        to: target, // list of receivers
        subject: "REGENERATE", // Subject line
        text: email, // plain text body
        html: email // html body
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) console.log(err)
        else console.log('E-mail sent!')
    })
}

module.exports = sendMail