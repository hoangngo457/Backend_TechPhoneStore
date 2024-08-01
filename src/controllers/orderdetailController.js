import Orderdetailservices from "../services/Orderdetailservices";

let handlegetAllOrderdetail = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Orderdetail = await Orderdetailservices.getAllOrderdetails(id);
  console.log(Orderdetail);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Orderdetail,
  });
};


let handleCreateOrderdetail = async (req, res) => {
  let DataOrderDetail = req.body;
  let data = DataOrderDetail.map((data) => ({
    order_id: data.order_id,
    quantity: data.quantity,
    idOpt: data.idOpt,
  }));
  let message = await Orderdetailservices.CreateOrderdetails(data);
  return res.status(200).json(message);
};




let handleDeleteOrderdetail = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Orderdetailservices.deleteOrderdetails(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditOrderdetail = async (req, res) => {
  let message = await Orderdetailservices.updateOrderdetailsData(req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllOrderdetail: handlegetAllOrderdetail,
  handleCreateOrderdetail: handleCreateOrderdetail,
  handleDeleteOrderdetail: handleDeleteOrderdetail,
  handleEditOrderdetail: handleEditOrderdetail,
};
