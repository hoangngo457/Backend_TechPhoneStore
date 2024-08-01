import productServices from "../services/productServices";

let handlegetAllProduct = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Product = await productServices.getAllProducts(id);
  console.log(Product);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Product,
  });
};

let handleCreateProducts = async (req, res) => {
  let message = await productServices.CreateProducts(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteProducts = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await productServices.deleteProducts(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditProducts = async (req, res) => {
  let data = req.body;
  let message = await productServices.updateProductData(data);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllProduct: handlegetAllProduct,
  handleCreateProducts: handleCreateProducts,
  handleDeleteProducts: handleDeleteProducts,
  handleEditProducts: handleEditProducts,
};
