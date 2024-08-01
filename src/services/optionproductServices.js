import e from "express";
import db from "../models/index";

let getAllOption_Product = (Option_ProductId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Option_Product = "";
      let array = Option_ProductId.split("KeyALL");

      if (array.length > 1) {
        let parts = Option_ProductId.split("KeyALL");
        Option_Product = await db.Option_Product.findAll({
          where: { idPro: Number(parts[0]) }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Products,
              as: "idProductsData",
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
              as: "idColorOptData",
              attributes: ["nameColor"],
            },
            {
              model: db.Ram,
              as: "idRamData",
              attributes: ["nameRam"],
            },
            {
              model: db.Rom,
              as: "idRomData",
              attributes: ["nameRom"],
            },
          ],
          raw: true,
          nest: true,
        });
      }

      if (Option_ProductId == "ALL" || Option_ProductId == "BESTSELLER") {
        Option_Product = db.Option_Product.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Products,
              as: "idProductsData",
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
              as: "idColorOptData",
              attributes: ["nameColor"],
            },
            {
              model: db.Ram,
              as: "idRamData",
              attributes: ["nameRam"],
            },
            {
              model: db.Rom,
              as: "idRomData",
              attributes: ["nameRom"],
            },
          ],
          raw: true,
          nest: true,
        });
      }

      if (
        Option_ProductId &&
        Option_ProductId !== "ALL" &&
        Option_ProductId &&
        Option_ProductId !== "BESTSELLER" &&
        array.length < 2
      ) {
        let parts = Option_ProductId.split("-");
        Option_Product = await db.Option_Product.findAll({
          where: { idPro: Number(parts[0]), idColor: Number(parts[1]) }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Products,
              as: "idProductsData",
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
              as: "idColorOptData",
              attributes: ["nameColor"],
            },
            {
              model: db.Ram,
              as: "idRamData",
              attributes: ["nameRam"],
            },
            {
              model: db.Rom,
              as: "idRomData",
              attributes: ["nameRom"],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(Option_Product);
    } catch (e) {
      reject(e);
    }
  });
};






let getFilterOption_Product = (Option_ProductId, priceOrder, brandId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Option_Product = "";

      if (brandId != 0) {
        let orderOption = [];
        if (priceOrder === "Giá cao") {
          orderOption.push(["price", "DESC"]);
        } else if (priceOrder === "Giá thấp") {
          orderOption.push(["price", "ASC"]);
        } else if (priceOrder === "") {
          orderOption.push(["createdAt", "DESC"]);
        } else {
          orderOption.push(["createdAt", "DESC"]);
        }

        let whereCondition = {};
        if (brandId !== 0) {
          whereCondition.idBrand = brandId;
          console.log("Filtering by brandId:", brandId); // Debug log
        } else {
          console.log("No brandId provided");
        }

        let findOptions = {
          order: orderOption,
          include: [
            {
              model: db.Products,
              as: "idProductsData",
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
              where: whereCondition, // Thêm điều kiện lọc tại đây
              required: true, // Ensure inner join
            },
            {
              model: db.Color,
              as: "idColorOptData",
              attributes: ["nameColor"],
            },
            {
              model: db.Ram,
              as: "idRamData",
              attributes: ["nameRam"],
            },
            {
              model: db.Rom,
              as: "idRomData",
              attributes: ["nameRom"],
            },
          ],
          raw: true,
          nest: true,
        };

        if (Option_ProductId === "ALL") {
          Option_Product = await db.Option_Product.findAll(findOptions);
        } else {
          // Nếu không có Option_ProductId, trả về tất cả sản phẩm
          Option_Product = await db.Option_Product.findAll({
            where: { id: Option_ProductId },
          });
        }

        console.log("Query result:", Option_Product.length); // Debug log

        resolve(Option_Product);
      } else {
        let orderOption = [];
        if (priceOrder === "Giá cao") {
          orderOption.push(["price", "DESC"]);
        } else if (priceOrder === "Giá thấp") {
          orderOption.push(["price", "ASC"]);
        } else if (priceOrder === "") {
          orderOption.push(["createdAt", "DESC"]);
        } else {
          orderOption.push(["createdAt", "DESC"]);
        }

        let findOptions = {
          order: orderOption,
          include: [
            {
              model: db.Products,
              as: "idProductsData",
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
              as: "idColorOptData",
              attributes: ["nameColor"],
            },
            {
              model: db.Ram,
              as: "idRamData",
              attributes: ["nameRam"],
            },
            {
              model: db.Rom,
              as: "idRomData",
              attributes: ["nameRom"],
            },
          ],
          raw: true,
          nest: true,
        };

        if (Option_ProductId === "ALL") {
          Option_Product = await db.Option_Product.findAll(findOptions);
        } else {
          // Nếu không có Option_ProductId, trả về tất cả sản phẩm
          Option_Product = await db.Option_Product.findAll(findOptions);
        }

        console.log("Query result:", Option_Product.length); // Debug log

        resolve(Option_Product);
      }
    } catch (e) {
      console.error("Error in getFilterOption_Product:", e); // Debug log
      reject(e);
    }
  });
};

















let CreateOption_Product = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Option_Product.create({
        idRam: data.idRam,
        idRom: data.idRom,
        idColor: data.idColor,
        quantity: data.quantity,
        price: data.price,
        idPro: data.idPro,
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
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOption_Product = (productId) => {
  return new Promise(async (resolve, reject) => {
    let Option_Product = await db.Option_Product.findOne({
      where: { id: productId },
    });
    if (!Option_Product) {
      resolve({
        errcode: 2,
        errMessage: "product isn't exist !",
      });
    }
    await db.Option_Product.destroy({
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
      if (!data.id || !data.ram) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Option_Product = await db.Option_Product.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Option_Product) {
        Option_Product.idRam = data.idRam;
        Option_Product.idRom = data.idRom;
        Option_Product.idColor = data.idColor;
        Option_Product.price = data.price;
        Option_Product.quantity = data.quantity;
        Option_Product.idPro = data.idPro;
        await Option_Product.save();
        resolve({
          errcode: 0,
          errMessage: "update product succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "option product not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllOption_Product: getAllOption_Product,
  getFilterOption_Product:getFilterOption_Product,
  CreateOption_Product: CreateOption_Product,
  deleteOption_Product: deleteOption_Product,
  updateProductData: updateProductData,
};
