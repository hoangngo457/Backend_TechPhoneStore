import bcryptjs from "bcryptjs";
import db from "../models/index";
import { v2 as cloudinary } from "cloudinary";

const salt = bcryptjs.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcryptjs.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (taikhoan, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUsertaikhoan(taikhoan);
      if (isExist) {
        //user allready exist

        let user = await db.Users.findOne({
          attributes: [
            "roleId",
            "password",
            "fullName",
            "phoneNumber",
            "email",
            "address",
            "image",
            "id",
          ], //  chỉ hiện taikhoan, roleid,
          where: { email: taikhoan },
          raw: true, // xóa passwword
        });
        if (user) {
          //compare password
          let check = await bcryptjs.compareSync(password, user.password);
          if (check) {
            (userData.errcode = 0), (userData.errMessage = "oke");
            delete user.password; // xóa passwword khỏi api khỏi lo bị hack
            userData.user = user;
          } else {
            userData.errcode = 3;
            userData.errMessage = "Mật khẩu sai";
          }
        } else {
          userData.errcode = 2;
          userData.errMessage = "Người dùng không tồn tại";
        }
      } else {
        //return error
        userData.errcode = 1;
        userData.errMessage =
          "email không tồn tại vui lòng  đăng kí hoặc kiểm tra lại";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUsertaikhoan = (taikhoan) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { email: taikhoan },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

//userId là tham số truyền vào ví dụ id =1 hay  la 2 3 ......

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "ALL") {
        users = db.Users.findAll({
          // ẩn mật khẩu
          attributes: {
            exclude: ["password"],
          },
          order: [["createdAt", "DESC"]],
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.Users.findOne({
          where: { id: userId }, //  userId laf cais tham so truyen vao
          // ẩn mật khẩu
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateNewUser = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check taikhoan is exist??
      let check = await checkUsertaikhoan(data.email);

      if (check == true) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename); // khi  bị lỗi nó sẽ  không upload ảnh
        resolve({
          errcode: 1,
          message: "Email đã tồn tại vui lòng nhập địa chỉ email khác",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.Users.create({
          password: hashPasswordFromBcrypt,
          fullName: data.fullName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          roleId: data.roleId,
          image: fileData?.path,
          filename: fileData?.filename,
        });

        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          message: "Đăng ký thành công",
          data: data,
          fileData: fileData?.path,
        });

        resolve({
          errcode: 0,
          message: "Đăng ký thành công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Users.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errcode: 2,
        errMessage: "the user isn't exist !",
      });
      if (userId) cloudinary.uploader.destroy(user.filename); // khi  bị lỗi nó sẽ  không upload ảnh
    }
    await db.Users.destroy({
      where: { id: userId },
    });
    resolve({
      errcode: 0,
      errMessage: "the user is deleted !",
    });
    if (userId) cloudinary.uploader.destroy(user.filename); // khi  bị lỗi nó sẽ  không upload ảnh
  });
};
let updateUserData = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
        } else {
          data.image == null
            ? console.log("khong thay doi anh")
            : cloudinary.uploader.destroy(data.filename);
        } // khi  bị lỗi nó sẽ  không upload ảnh
      }
      let user = await db.Users.findOne({
        where: { id: data.id },
        raw: false,
      });
      let image;
      let filename;

      if (user) {
        if (fileData == null) {
          data.image == null ? (image = user.image) : (image = data.image);
          data.filename == null
            ? (filename = user.filename)
            : (filename = data.filename);
        } else {
          image = fileData?.path;
          filename = fileData?.filename;
        }

        user.fullName = data.fullName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.email = data.email;
        user.roleId = data.roleId;
        user.image = image;
        if (fileData) {
          cloudinary.uploader.destroy(user.filename);
          user.filename = filename;
        } else {
          cloudinary.uploader.destroy(user.filename);
          user.filename = filename;
        } // khi  bị lỗi nó sẽ  không upload ảnh

        await user.save();
        // await db.User.save({
        //     fistName:data.firstName,
        //     lastName:data.lastName,
        //     address:data.address,

        // }); //  muốn không bị lỗi TypeError: user.save is not a function thì vào config.json đổi raw: true --> false  là đc
        resolve({
          errcode: 0,
          errMessage: "update the user succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "User's not found !",
        });
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
        } else {
          data.image == null
            ? console.log("khong thay doi anh o phia android")
            : cloudinary.uploader.destroy(data.filename);
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let changepassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id && !data.oldpassword && !data.newpassword) {
        resolve({
          errcode: 2,
          message: " không được bỏ trống",
        });
      }

      let user = await db.Users.findOne({
        where: { id: data.id },
        raw: false,
      });

      let check = await bcryptjs.compareSync(data.oldpassword, user.password);
      console.log("check laaaaaaa:" + check);
      if (check) {
        let hashPasswordFromBcrypt = await hashUserPassword(data.newpassword);
        user.password = hashPasswordFromBcrypt;

        await user.save();

        resolve({
          errcode: 0,
          message: "đổi mật khẩu thành công !",
        });
      } else {
        resolve({
          errcode: 1,
          message: " mật khẩu cũ sai !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  CreateNewUser: CreateNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  changepassword: changepassword,
};
