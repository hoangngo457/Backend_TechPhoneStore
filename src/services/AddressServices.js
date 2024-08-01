import db from "../models/index";

let CreateAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Address.create({
        name: data.name,
        city: data.city,
        district: data.district,
        ward: data.ward,
        phone_num: data.phone_num,
        detail_Adr: data.detail_Adr,
        idUser: data.idUser,
      });
      if (!data) {
        data = {};
      }

      resolve({
        errcode: 0,
        message: "Thêm địa chỉ thành công",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteAddress = (AddressId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Address.findOne({
      where: { id: AddressId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        message: "Địa chỉ không tồn tại",
      });
    }
    await db.Address.destroy({
      where: { id: AddressId },
    });

    resolve({
      errcode: 0,
      message: "Xóa địa chỉ thành công !",
    });
  });
};

let updateAddressData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Address = await db.Address.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Address) {
        (Address.name = data.name),
          (Address.city = data.city),
          (Address.district = data.district),
          (Address.ward = data.ward),
          (Address.phone_num = data.phone_num),
          (Address.detail_Adr = data.detail_Adr),
          await Address.save();
        resolve({
          errcode: 0,
          message: "Cập nhật địa chỉ thành công !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "cập nhật địa chỉ thất bại rồi",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllAddress = (AddressId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Address = "";
      if (AddressId == "ALL") {
        Address = db.Address.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Users,
              as: "idUserData",
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
          ],
          raw: true,
          nest: true,
        });
      }
      if (AddressId && AddressId !== "ALL") {
        Address = await db.Address.findOne({
          where: { id: AddressId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Users,
              as: "idUserData",
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
          ],
          raw: true,
          nest: true,
        });
      }

      resolve(Address);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllAddressByIdUser = (AddressId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Address = "";
      if (AddressId) {
        Address = db.Address.findAll({
          where: { idUser: AddressId }, //  productId laf cais tham so truyen vao
          include: [
            {
              model: db.Users,
              as: "idUserData",
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
          ],
          raw: true,
          nest: true,
        });
        resolve(Address);
      } else {
        resolve({
          errcode: 1,
          message: "Lấy danh sách địa chỉ  thất bại !",
          Address,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllAddress: getAllAddress,
  getAllAddressByIdUser: getAllAddressByIdUser,
  CreateAddress: CreateAddress,
  deleteAddress: deleteAddress,
  updateAddressData: updateAddressData,
};
