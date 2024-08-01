import db from "../models/index";

let CreateCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Cart.create({
        quantity: data.quantity,
        idUser: data.idUser,
        idOpt: data.idOpt,
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
let deleteCart = (CartId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Cart.findOne({
      where: { id: CartId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Cart.destroy({
      where: { id: CartId },
    });

    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateCartData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Cart = await db.Cart.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Cart) {
        (Cart.quantity = data.quantity), await Cart.save();
        if ((Cart.quantity = 0)) {
          resolve({
            errcode: 2,
            errMessage: "notice to user",
          });
        }
        resolve({
          errcode: 0,
          errMessage: "update Cart succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Cart not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCart = (CartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Cart = "";
      if (CartId == "ALL") {
        Cart = db.Cart.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      if (CartId && CartId !== "ALL") {
        Cart = await db.Cart.findOne({
          where: { id: CartId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(Cart);
    } catch (e) {
      reject(e);
    }
  });
};

/// **

let getCartByIdOpt = (idOpt, idUser) => {
  return new Promise(async (resolve, reject) => {
    let Cart = null;
    try {
      Cart = await db.Cart.findOne({
        where: { idOpt: idOpt, idUser: idUser }, //  productId laf cais tham so truyen vao
      });

      resolve(Cart);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCartByUSer = (UserID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Cart = await db.Cart.findAll({
        where: { idUser: UserID },
      });
      resolve(Cart);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCart: getAllCart,
  CreateCart: CreateCart,
  deleteCart: deleteCart,
  updateCartData: updateCartData,
  getAllCartByUSer: getAllCartByUSer,
  getCartByIdOpt: getCartByIdOpt,
};
