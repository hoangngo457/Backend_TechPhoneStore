import db from "../models/index";

let getAllProducts = (ProductsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Products = "";
      if (ProductsId == "ALL") {
        Products = db.Products.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Brands,
              as: "idBrandData",
              attributes: ["name", "origin", "image", "filename"],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      if (ProductsId && ProductsId !== "ALL") {
        Products = await db.Products.findOne({
          where: { id: ProductsId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Brands,
              as: "idBrandData",
              attributes: ["name", "origin", "image", "filename"],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(Products);
    } catch (e) {
      reject(e);
    }
  });
};

let checkproductname = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Products.findOne({
        where: { name: name },
      });
      if (products) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let CreateProducts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check taikhoan is exist??
      let check = await checkproductname(data.name);
      if (check == true) {
        resolve({
          errcode: 1,
          errMessage: "Tên sản phẩm đã tồn tại vui lòng nhập tên sản phẩm khác",
        });
      } else {
        await db.Products.create({
          name: data.name,
          year: data.year,
          cpu: data.cpu,
          display: data.display,
          camera: data.camera,
          battery: data.battery,
          os: data.os,
          idBrand: data.idBrand,
          idDiscount: data.idDiscount,
        });

        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          data: data,
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

let deleteProducts = (productId) => {
  return new Promise(async (resolve, reject) => {
    let products = await db.Products.findOne({
      where: { id: productId },
    });
    if (!products) {
      resolve({
        errcode: 2,
        errMessage: "product isn't exist !",
      });
    }
    await db.Products.destroy({
      where: { id: productId },
    });
    resolve({
      errcode: 0,
      errMessage: "product is deleted !",
    });
  });
};
let updateProductData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let products = await db.Products.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (products) {
        products.name = data.name;
        products.year = data.year;
        products.cpu = data.cpu;
        products.display = data.display;
        products.camera = data.camera;
        products.battery = data.battery;
        products.os = data.os;
        products.idBrand = data.idBrand;
        products.idDiscount = data.idDiscount;
        await products.save();
        resolve({
          errcode: 0,
          errMessage: "update product succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "product not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  CreateProducts: CreateProducts,
  deleteProducts: deleteProducts,
  updateProductData: updateProductData,
};
