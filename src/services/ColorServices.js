import db from "../models/index";



let CreateColor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    
        await db.Color.create({
         nameColor:data.nameColor
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
let deleteColor = (ColorId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Color.findOne({
      where: { id: ColorId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Color.destroy({
      where: { id: ColorId },
    });
    
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateColorData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required paColoreter",
        });
        
      }
      let Color = await db.Color.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Color) {
        Color.nameColor=data.nameColor,
       
      
        await Color.save();
        resolve({
          errcode: 0,
          errMessage: "update Color succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Color not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllColor = (ColorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Color = "";
      if (ColorId == "ALL") {
        Color = db.Color.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      if (ColorId && ColorId !== "ALL") {
        Color = await db.Color.findOne({
          where: { id: ColorId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(Color);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllColor: getAllColor,
  CreateColor: CreateColor,
  deleteColor: deleteColor,
  updateColorData: updateColorData,
};
