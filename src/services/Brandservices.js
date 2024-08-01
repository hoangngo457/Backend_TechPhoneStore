import db from "../models/index";
import { v2 as cloudinary } from "cloudinary";

let checkBrandsname = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Brands = await db.Brands.findOne({
        where: { name: name },
      });
      if (Brands) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let CreateBrands = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check taikhoan is exist??
      let check = await checkBrandsname(data.name);
      if (check == true) {
        resolve({
          errcode: 1,
          errMessage: "Tên loại sản phẩm này đã tồn tại",
        });
        if (fileData) cloudinary.uploader.destroy(fileData.filename); // khi  bị lỗi nó sẽ  không upload ảnh
      } else {
        await db.Brands.create({
          name: data.name,
          origin: data.origin,
          image: fileData?.path,
          filename: fileData?.filename,
        });
        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          data: data,
          fileData: fileData?.path,
        });

        resolve({
          errcode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteBrands = (BrandsId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Brands.findOne({
      where: { id: BrandsId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Brands.destroy({
      where: { id: BrandsId },
    });
    if (BrandsId) cloudinary.uploader.destroy(category.filename); // khi  bị lỗi nó sẽ  không upload ảnh
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateBrandsData = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
        if (fileData) cloudinary.uploader.destroy(fileData.filename); // khi  bị lỗi nó sẽ  không upload ảnh
      }
      let Brands = await db.Brands.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Brands) {
        Brands.name = data.name;
        Brands.origin = data.origin;
        Brands.image = fileData?.path;
        if (fileData) cloudinary.uploader.destroy(Brands.filename); // khi  bị lỗi nó sẽ  không upload ảnh
        Brands.filename = fileData?.filename;
        await Brands.save();
        resolve({
          errcode: 0,
          errMessage: "update Brands succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Brands not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllBrands = (BrandsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Brands = "";
      if (BrandsId == "ALL") {
        Brands = db.Brands.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      if (BrandsId && BrandsId !== "ALL") {
        Brands = await db.Brands.findOne({
          where: { id: BrandsId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(Brands);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllBrands: getAllBrands,
  CreateBrands: CreateBrands,
  deleteBrands: deleteBrands,
  updateBrandsData: updateBrandsData,
};
