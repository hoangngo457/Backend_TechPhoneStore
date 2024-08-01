import { DATE } from "sequelize";
import db from "../models/index";

let CreateOrders = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        return resolve({
          errcode: 1,
          message: "Vui lòng truyền đủ thông tin",
          data: data,
        });
      }

      let newOrder = await db.Orders.create({
        order_date: Date.now(),
        order_status: data.order_status,
        total_value: data.total_value,
        payment: data.payment,
        idAdr: data.idAdr,
      });

      resolve({
        errcode: 0,
        message: "Đặt hàng thành công",
        data: {
          ...data,
          id: newOrder.id // Thêm ID của bản ghi vừa tạo vào kết quả trả về
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteOrders = (OrdersId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Orders.findOne({
      where: { id: OrdersId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Orders.destroy({
      where: { id: OrdersId },
    });

    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateOrdersData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Orders = await db.Orders.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Orders) {
        (Orders.order_date = data.order_date),
          (Orders.order_status = data.order_status),
          (Orders.total_value = data.total_value),
          (Orders.payment = data.payment),
          (Orders.idAdr = data.idAdr);
        await Orders.save();
        resolve({
          errcode: 0,
          errMessage: "update Orders succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Orders not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllOrders = (OrdersId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Orders = "";
      if (OrdersId == "ALL") {
        Orders = db.Orders.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Address,
              as: "idAddressData",
              attributes: [
                "id",
                "name",
                "city",
                "district",
                "ward",
                "phone_num",
                "detail_Adr",
                "idUser",
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      if (OrdersId && OrdersId !== "ALL") {
        Orders = await db.Orders.findOne({
          where: { id: OrdersId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Address,
              as: "idAddressData",
              attributes: [
                "id",
                "name",
                "city",
                "district",
                "ward",
                "phone_num",
                "detail_Adr",
                "idUser",
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(Orders);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllOrders: getAllOrders,
  CreateOrders: CreateOrders,
  deleteOrders: deleteOrders,
  updateOrdersData: updateOrdersData,
};
