import db from "../models/index";



let CreateRom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    
        await db.Rom.create({
         nameRom:data.nameRom
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
let deleteRom = (RomId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Rom.findOne({
      where: { id: RomId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Rom.destroy({
      where: { id: RomId },
    });
    
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateRomData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required paRometer",
        });
        
      }
      let Rom = await db.Rom.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Rom) {
        Rom.nameRom=data.nameRom,
       
      
        await Rom.save();
        resolve({
          errcode: 0,
          errMessage: "update Rom succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Rom not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRom = (RomId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Rom = "";
      if (RomId == "ALL") {
        Rom = db.Rom.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      if (RomId && RomId !== "ALL") {
        Rom = await db.Rom.findOne({
          where: { id: RomId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(Rom);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllRom: getAllRom,
  CreateRom: CreateRom,
  deleteRom: deleteRom,
  updateRomData: updateRomData,
};
