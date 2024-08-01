import db from "../models/index";

let CreateFeedBack = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.FeedBack.create({
        rating: data.rating,
        comment: data.comment,
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

let deleteFeedBack = (FeedBackId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.FeedBack.findOne({
      where: { id: FeedBackId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.FeedBack.destroy({
      where: { id: FeedBackId },
    });

    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateFeedBackData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let FeedBack = await db.FeedBack.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (FeedBack) {
        FeedBack.comment = data.comment;
        FeedBack.rating = data.rating;
        FeedBack.idOpt = data.idOpt;
        FeedBack.idUser = data.idUser;

        await FeedBack.save();
        resolve({
          errcode: 0,
          errMessage: "update FeedBack succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "FeedBack not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllFeedBack = (FeedBackId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let FeedBack = "";
      if (FeedBackId == "ALL") {
        FeedBack = db.FeedBack.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Users,
              as: "idUsersFeedBackData",
              attributes: [
                "fullName",
                "address",
                "phoneNumber",
                "email",
                "image",
                "filename",
                "roleId",
              ],
            },

            {
              model: db.Option_Product,
              as: "idOption_ProductsData",
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
          ],
          raw: true,
          nest: true,
        });
      }
      if (FeedBackId && FeedBackId !== "ALL") {
        FeedBack = await db.FeedBack.findOne({
          where: { id: FeedBackId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Users,
              as: "idUsersFeedBackData",
              attributes: [
                "fullName",
                "address",
                "phoneNumber",
                "email",
                "image",
                "filename",
                "roleId",
              ],
            },

            {
              model: db.Option_Product,
              as: "idOption_ProductsData",
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
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(FeedBack);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllFeedBack: getAllFeedBack,
  CreateFeedBack: CreateFeedBack,
  deleteFeedBack: deleteFeedBack,
  updateFeedBackData: updateFeedBackData,
};
