import userSevices from "../services/userServices";
import { v2 as cloudinary } from "cloudinary";

let handleLogin = async (req, res) => {
  let taikhoan = req.body.email;
  let password = req.body.password;
  //check taikhoan exist
  if (!taikhoan || !password) {
    return res.status(500).json({
      errcode: 1,
      message: "vui lòng điền đầy đủ thông tin",
    });
  }

  //compare password

  // return userInfor
  //access_token:jWT JSON web token
  let userData = await userSevices.handleUserLogin(taikhoan, password);
  console.log(userData);
  return res.status(200).json({
    errcode: userData.errcode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}, // check trên api in ra
  });
};

let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      users: [],
    });
  }
  let users = await userSevices.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let fileData = req.file;

  if (fileData != undefined) {
    let message = await userSevices.CreateNewUser(req.body, fileData);
    console.log(message);
    return res.status(200).json(message);
  } else {
    if (fileData) cloudinary.uploader.destroy(fileData.filename); // khi  bị lỗi nó sẽ  không upload ảnh
    let message = await userSevices.CreateNewUser(req.body, fileData?.path);
    return res.status(200).json(message);
  }
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await userSevices.deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let fileData = req.file;
  let data = req.body;

  if (fileData != undefined) {
    let message = await userSevices.updateUserData(req.body, fileData);
    console.log(message);
    return res.status(200).json(message);
  } else {
    if (fileData) cloudinary.uploader.destroy(fileData.filename); // khi  bị lỗi nó sẽ  không upload ảnh
    let message = await userSevices.updateUserData(data, fileData?.path);
    return res.status(200).json(message);
  }
};

let handleChangePassword = async (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      errcode: 1,
      message: "không được bỏ trống !",
    });
  } else {
    let message = await userSevices.changepassword(req.body);

    return res.status(200).json(message);
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  handleChangePassword: handleChangePassword,
};
