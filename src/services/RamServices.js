import db from "../models/index";



let CreateRam = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    
        await db.Ram.create({
         nameRam:data.nameRam
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
let deleteRam = (RamId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Ram.findOne({
      where: { id: RamId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Ram.destroy({
      where: { id: RamId },
    });
    
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateRamData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
        
      }
      let Ram = await db.Ram.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Ram) {
        Ram.nameRam=data.nameRam,
       
      
        await Ram.save();
        resolve({
          errcode: 0,
          errMessage: "update Ram succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Ram not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRam = (RamId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Ram = "";
      if (RamId == "ALL") {
        Ram = db.Ram.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      if (RamId && RamId !== "ALL") {
        Ram = await db.Ram.findOne({
          where: { id: RamId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(Ram);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllRam: getAllRam,
  CreateRam: CreateRam,
  deleteRam: deleteRam,
  updateRamData: updateRamData,
};
