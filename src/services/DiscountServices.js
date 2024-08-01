import db from "../models/index";



let CreateDiscount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    
        await db.Discount.create({
          code:data.code,
          discount_amount:data.discount_amount,
          start_date:data.start_date,
          end_date:data.end_date,
          idOpt:data.idOpt,
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
let deleteDiscount = (DiscountId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Discount.findOne({
      where: { id: DiscountId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Discount.destroy({
      where: { id: DiscountId },
    });
    
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateDiscountData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
        
      }
      let Discount = await db.Discount.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Discount) {
        
        Discount.code=data.code,
        Discount.discount_amount=data.discount_amount,
        Discount.start_date=data.start_date,
        Discount. end_date=data.end_date,
        Discount.idOpt=data.idOpt,
      
        await Discount.save();
        resolve({
          errcode: 0,
          errMessage: "update Discount succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Discount not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDiscount = (DiscountId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Discount = "";
      if (DiscountId == "ALL") {
        Discount = db.Discount.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      if (DiscountId && DiscountId !== "ALL") {
        Discount = await db.Discount.findOne({
          where: { id: DiscountId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(Discount);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllDiscount: getAllDiscount,
  CreateDiscount: CreateDiscount,
  deleteDiscount: deleteDiscount,
  updateDiscountData: updateDiscountData,
};
