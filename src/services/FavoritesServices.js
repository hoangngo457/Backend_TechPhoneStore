import db from "../models/index";

let CreateFavorites = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Favorites.create({
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

let CreateFavorites_V2 = (idOpt, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Favorites.create({
        idUser: idUser,
        idOpt: idOpt,
      });
      if (!idUser || !idOpt) {
        resolve({
          errcode: 500,
          errMessage: "fail",
        });
      }
      resolve({
        errcode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteFavorites = (FavoritesId, idUser) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Favorites.findOne({
      where: { idOpt: FavoritesId, idUser: idUser },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Favorites.destroy({
      where: { idOpt: FavoritesId, idUser: idUser },
    });

    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateFavoritesData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Favorites = await db.Favorites.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Favorites) {
        (Favorites.idOpt = data.idOpt),
          (Favorites.idUser = data.idUser),
          await Favorites.save();
        resolve({
          errcode: 0,
          errMessage: "update Favorites succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Favorites not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllFavorites = (FavoritesId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Favorites = "";
      if (FavoritesId == "ALL") {
        Favorites = db.Favorites.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Users,
              as: "idUsersFavoriteData",
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
              as: "idOptionFavoriteData",
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
      if (FavoritesId && FavoritesId !== "ALL") {
        Favorites = await db.Favorites.findOne({
          where: { id: FavoritesId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Users,
              as: "idUsersFavoriteData",
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
              as: "idOptionFavoriteData",
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
      resolve(Favorites);
    } catch (e) {
      reject(e);
    }
  });
};

let getALlByUserFavorites = (FavoritesId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Favorites = "";

      Favorites = db.Favorites.findAll({
        where: { idUser: FavoritesId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Users,
            as: "idUsersFavoriteData",
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
            as: "idOptionFavoriteData",
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

      resolve(Favorites);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllFavorites: getAllFavorites,
  CreateFavorites: CreateFavorites,
  deleteFavorites: deleteFavorites,
  updateFavoritesData: updateFavoritesData,
  getALlByUserFavorites: getALlByUserFavorites,
  CreateFavorites_V2: CreateFavorites_V2,
};
