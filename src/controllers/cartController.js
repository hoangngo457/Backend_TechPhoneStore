import Cartservices from "../services/Cartservices";
import OPtion from "../controllers/optionproductController";

let handlegetAllCartByUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      Cart: [],
    });
  }

  let Cart = await Cartservices.getAllCartByUSer(id);
  let DataUSer = await OPtion.getDataCartByid(id);
  Cart.forEach((element) => {
    const found = DataUSer.find((e) => e.CodeOption == element.idOpt);
    if (found) {
      element.data = found;
    }
  });
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Cart,
  });
};

let handlegetAllCart = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      Cart: [],
    });
  }
  let Cart = await Cartservices.getAllCart(id);
  console.log(Cart);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Cart,
  });
};

let handleCreateCart = async (req, res) => {
  let id = req.body.idOpt;
  let idUser = req.body.idUser;
  let check = await Cartservices.getCartByIdOpt(id, idUser);
  let message = null;
  if (check) {
    const data = {
      id: check.id,
      quantity: check.quantity + 1,
      idOpt: check.idOpt,
      idUser: check.idUser,
    };
    message = await Cartservices.updateCartData(data);
  } else {
    message = await Cartservices.CreateCart(req.body);
  }
  return res.status(200).json(message);
};

let handleDeleteCart = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Cartservices.deleteCart(req.query.id);
  return res.status(200).json(message);
};

let handleEditCart = async (req, res) => {
  let message = await Cartservices.updateCartData(req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllCart: handlegetAllCart,
  handleCreateCart: handleCreateCart,
  handleDeleteCart: handleDeleteCart,
  handleEditCart: handleEditCart,
  handlegetAllCartByUser: handlegetAllCartByUser,
};
