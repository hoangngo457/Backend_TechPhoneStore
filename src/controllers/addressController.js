import Addressservices from "../services/Addressservices";

let handlegetAllAddress = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      address: [],
    });
  }
  let Address = await Addressservices.getAllAddress(id);
  console.log(Address);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Address,
  });
};

let handlegetAllAddressByIdUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: " id bị null",
      address: [],
    });
  }
  let Address = await Addressservices.getAllAddressByIdUser(id);
  return res.status(200).json({
    errcode: 0,
    message: "lấy danh sách địa chỉ thành công",
    Address,
  });
};
let handleCreateAddress = async (req, res) => {
  let message = await Addressservices.CreateAddress(req.body);
  return res.status(200).json(message);
};
let handleDeleteAddress = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errcode: 1,
      message: "không nhận được tham số !",
    });
  }
  let message = await Addressservices.deleteAddress(req.query.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditAddress = async (req, res) => {
  let message = await Addressservices.updateAddressData(req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllAddress: handlegetAllAddress,
  handlegetAllAddressByIdUser: handlegetAllAddressByIdUser,
  handleCreateAddress: handleCreateAddress,
  handleDeleteAddress: handleDeleteAddress,
  handleEditAddress: handleEditAddress,
};
