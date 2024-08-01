import Orderservices from "../services/Orderservices";
import OrderDetails from "../services/Orderdetailservices";
import Option from "../services/optionproductServices";
import Solve from "../solve/solveDetailOrder";
import Option_ImageService from "../services/productImageServices";
import Cartservices from "../services/Cartservices";

let handleReBuy = async (req, res) => {
  let idUser = req.query.idUser;
  let idOrder = req.query.idOrder;
  let OrderALL = await Orderservices.getAllOrders("ALL");
  let OrderByUder = OrderALL.find(
    (e) => e.idAddressData.idUser == idUser && e.id == idOrder
  );
  let ALLDetatil = await OrderDetails.getAllOrderdetails("ALL");
  let DetailOrderALLByUder = ALLDetatil.filter(
    (e) => e.order_id == OrderByUder.id
  );

  let Cart = await Cartservices.getAllCart("ALL");
  let CartUser = Cart.filter((e) => e.idUser == idUser);

  DetailOrderALLByUder.forEach((element) => {
    let check = CartUser.find((e) => e.idOpt == element.idOpt);
    if (check) {
      const data = {
        id: check.id,
        quantity: check.quantity + 1,
        idOpt: check.idOpt,
        idUser: check.idUser,
      };
      Cartservices.updateCartData(data);
      console.log("update");
    } else {
      const data = {
        id: null,
        quantity: 1,
        idOpt: element.idOpt,
        idUser: idUser,
      };
      Cartservices.CreateCart(data);
      console.log("add new");
    }
  });

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    DetailOrderALLByUder,
  });
};

let handlegetAllOrder = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Order = await Orderservices.getAllOrders(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Order,
  });
};
let handlegetAllOrderByIdUser = async (req, res) => {
  let idUser = req.query.idUser;
  if (!idUser) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let OrderALL = await Orderservices.getAllOrders("ALL");
  let OrderALLByUder = OrderALL.filter((e) => e.idAddressData.idUser == idUser);
  let ALLDetatil = await OrderDetails.getAllOrderdetails("ALL");
  let allImg = await Option_ImageService.getAllProductImage("ALL");
  let ALLOpt = await Option.getAllOption_Product("ALL");
  let dataResult = Solve.getDataOrder(
    OrderALLByUder,
    ALLDetatil,
    ALLOpt,
    allImg
  );

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    dataResult,
  });
};

let handleCreateOrder = async (req, res) => {
  let message = await Orderservices.CreateOrders(req.body);
  return res.status(200).json(message);
};
let handleDeleteOrder = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Orderservices.deleteOrders(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditOrder = async (req, res) => {
  let message = await Orderservices.updateOrdersData(req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllOrder: handlegetAllOrder,
  handleCreateOrder: handleCreateOrder,
  handleDeleteOrder: handleDeleteOrder,
  handleEditOrder: handleEditOrder,
  handlegetAllOrderByIdUser: handlegetAllOrderByIdUser,
  handleReBuy: handleReBuy,
};
