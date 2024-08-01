import db from "../models/index";
import { v2 as cloudinary } from "cloudinary";

let CreateProductImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product_Image.bulkCreate(data);

      resolve({
        errcode: 0,
        data: data,
      });

      resolve({
        errcode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteProductImage = (ProductImageId) => {
  return new Promise(async (resolve, reject) => {
    let ProductImage = await db.Product_Image.findOne({
      where: { id: ProductImageId },
    });
    if (!ProductImage) {
      resolve({
        errcode: 2,
        errMessage: "ProductImage isn't exist !",
      });
      if (ProductImageId) cloudinary.uploader.destroy(ProductImage.filename); // khi  bị lỗi nó sẽ  không upload ảnh
    }
    await db.Product_Image.destroy({
      where: { id: ProductImageId },
    });
    resolve({
      errcode: 0,
      errMessage: "ProductImage is deleted !",
    });
    if (ProductImageId) cloudinary.uploader.destroy(ProductImage.filename); // khi  bị lỗi nó sẽ  không upload ảnh
  });
};

let updateProductImageData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let ProductImage = await db.Product_Image.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (ProductImage) {
        ProductImage.filepath = data.filepath;
        if (data) cloudinary.uploader.destroy(ProductImage.filename); // khi  bị lỗi nó sẽ  không upload ảnh
        ProductImage.filname = data.filename;
        ProductImage.idPro = data.idPro;
        ProductImage.idColor = data.idColor;

        await ProductImage.save();

        resolve({
          errcode: 0,
          errMessage: "update ProductImage succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "ProductImage not found !",
        });
        if (data) cloudinary.uploader.destroy(data.filename); // khi  bị lỗi nó sẽ  không upload ảnh
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllProductImage = (ProductImageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ProductImage = "";
      if (ProductImageId == "ALL") {
        ProductImage = db.Product_Image.findAll({
          order: [["createdAt", "DESC"]],
          // include: [
          //   {
          //     model: db.Products,
          //     as: "idProData",
          //     attributes: [
          //       "name",
          //       "year",
          //       "cpu",
          //       "display",
          //       "camera",
          //       "battery",
          //       "os",
          //       "idBrand",
          //       "idDiscount",
          //     ],
          //   },
          //   {
          //     model: db.Color,
          //     as: "idColorData",
          //     attributes: ["nameColor"],
          //   },
          // ],
          raw: true,
          nest: true,
        });
      }
      if (ProductImageId && ProductImageId !== "ALL") {
        ProductImage = await db.Product_Image.findOne({
          where: { id: ProductImageId }, //  productId laf cais tham so truyen vao
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Products,
              as: "idProData",
              attributes: [
                "name",
                "year",
                "cpu",
                "display",
                "camera",
                "battery",
                "os",
                "idBrand",
                "idDiscount",
              ],
            },
            {
              model: db.Color,
              as: "idColorData",
              attributes: ["nameColor"],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(ProductImage);
    } catch (e) {
      reject(e);
    }
  });
};

let getProductImageByIdColorAndIdPro = async (idPro, idColor) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let ProductImage = "";
      ProductImage = await db.Product_Image.findAll({
        where: { idPro: idPro, idColor: idColor }, //  productId laf cais tham so truyen vao
        attributes: ["image"],
        raw: true,
        nest: true,
      });
      resolve(ProductImage);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllProductImage: getAllProductImage,
  CreateProductImage: CreateProductImage,
  deleteProductImage: deleteProductImage,
  updateProductImageData: updateProductImageData,
  getProductImageByIdColorAndIdPro: getProductImageByIdColorAndIdPro,
};
