import db from "../models/index";

let CreateOrderdetails = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.OrderDetails.bulkCreate(data);
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
let deleteOrderdetails = (OrderdetailsId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.OrderDetails.findOne({
      where: { id: OrderdetailsId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.OrderDetails.destroy({
      where: { id: OrderdetailsId },
    });

    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateOrderdetailsData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Orderdetails = await db.OrderDetails.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Orderdetails) {
        (Orderdetails.order_id = data.order_id),
          (Orderdetails.quantity = data.quantity),
          (Orderdetails.idOpt = data.idOpt),
          await Orderdetails.save();
        resolve({
          errcode: 0,
          errMessage: "update Orderdetails succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Orderdetails not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllOrderdetails = (OrderdetailsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Orderdetails = "";
      if (OrderdetailsId == "ALL") {
        Orderdetails = db.OrderDetails.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Option_Product,
              as: "idOptionData",
              attributes: [
                "idRam",
                "idRom",
                "idColor",
                "price",
                "quantity",
                "sold",
                "idPro",
              ],
            },
            {
              model: db.Orders,
              as: "idOrderData",
              attributes: [
                "order_status",
                "order_date",
                "total_value",
                "payment",
                "idAdr",
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      if (OrderdetailsId && OrderdetailsId !== "ALL") {
        Orderdetails = await db.OrderDetails.findOne({
          where: { id: OrderdetailsId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Option_Product,
              as: "idOptionData",
              attributes: [
                "idRam",
                "idRom",
                "idColor",
                "price",
                "quantity",
                "sold",
                "idPro",
              ],
            },
            {
              model: db.Orders,
              as: "idOrderData",
              attributes: [
                "order_status",
                "order_date",
                "total_value",
                "payment",
                "idAdr",
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(Orderdetails);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllOrderdetails: getAllOrderdetails,
  CreateOrderdetails: CreateOrderdetails,
  deleteOrderdetails: deleteOrderdetails,
  updateOrderdetailsData: updateOrderdetailsData,
};
