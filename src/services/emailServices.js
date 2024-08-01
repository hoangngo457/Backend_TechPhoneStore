const { reject } = require("lodash");
const nodemailer = require("nodemailer");
require("dotenv").config();

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"TECHPHONE"<nhoxtuananh092@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Quên Mật Khẩu", // Subject line
    text: "Thông tin mật khẩu mới", // plain text body
    html: `<h3> Xin chào !</h3>
        <p> Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu thay đổi mật khẩu của bạn </p>
        <p>Thông tin mật khẩu:</p>
        <div> <b>Mật khẩu mới của bạn là:${dataSend.password} <b/></div>
       
<p>Cảm ơn bạn đã sử dụng app của chúng  tôi</p>
<div> Xin chân thành cảm ơn :3 </div>
        `, // html body
  });
};


module.exports = {
  sendSimpleEmail: sendSimpleEmail,
 
};
