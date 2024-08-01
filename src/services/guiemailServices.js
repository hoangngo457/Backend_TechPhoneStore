import db from "../models/index";
import emailServices from "./emailServices";
import bcryptjs from "bcryptjs";
require("dotenv").config();

const salt = bcryptjs.genSaltSync(10);

let mahoapassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcryptjs.hash(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

function generateRandomPassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

let guiemail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errcode: 1,
          message: "Vui lòng nhập email",
        });
      } else {
        const passwordramdom = generateRandomPassword(5);
        let hashPasswordFromBcrypt = await mahoapassword(passwordramdom);

        let doimatkhau = await db.Users.findOne({
          where: { email: data.email },
          raw: false,
        });

        if (!doimatkhau) {
          resolve({
            errcode: 2,
            message: "email không tồn tại",
          });
          return;
        }

        doimatkhau.password = hashPasswordFromBcrypt;
        await doimatkhau.save();

        await emailServices.sendSimpleEmail({
          email: data.email,
          password: passwordramdom,
        });

        resolve({
          errcode: 0,
          message: "Đổi mật khẩu và gửi email thành công!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  guiemail: guiemail,
};
