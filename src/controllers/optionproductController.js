import e from "express";
import Option_ProductServices from "../services/optionproductServices";
import Option_ImageService from "../services/productImageServices";
import Option_FeekBackService from "../services/FeedBackServices";
import Otion_favorite from "../services/FavoritesServices";
import Solve from "../solve/solve";

let getDataCartByid = async (idUser) => {
  let Option_favorite = await Otion_favorite.getALlByUserFavorites(idUser);
  let Option_Product = await Option_ProductServices.getAllOption_Product("ALL");
  let allImg = await Option_ImageService.getAllProductImage("ALL");
  let AllFeedBack = await Option_FeekBackService.getAllFeedBack("ALL");
  const found = Solve.solveDataReturn_V2(
    Option_Product,
    allImg,
    AllFeedBack,
    null,
    Option_favorite
  );

  return found;
};

let handlegetAllOption_Product = async (req, res) => {
  let id = req.query.id;
  let idUser = req.query.idUser;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      Option_Products: [],
    });
  }
  let Option_Product = await Option_ProductServices.getAllOption_Product(id);
  let Option_favorite = await Otion_favorite.getALlByUserFavorites(idUser);
  let Option_Product_All = null;

  if (id.split("-").length > 1) {
    const idFix = id.split("-")[0] + "KeyALL00";
    Option_Product_All = await Option_ProductServices.getAllOption_Product(
      idFix
    );
  }

  let allImg = await Option_ImageService.getAllProductImage("ALL");
  let AllFeedBack = await Option_FeekBackService.getAllFeedBack("ALL");

  Option_Product = Solve.solveDataReturn(
    Option_Product,
    allImg,
    AllFeedBack,
    Option_Product_All,
    Option_favorite
  );

  if (id == "BESTSELLER") {
    // sort decrease data
    Option_Product.sort((a, b) => b.sold - a.sold);
    Option_Product = Option_Product.slice(0, 4);
  }
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Option_Product,
  });
};

let handlegetFilterProduct = async (req, res) => {
  let id = req.query.id; // all, id
  let idUser = req.query.idUser;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "không có tham số gì cả",
      filterProduct: [],
    });
  }

  // Tách giá trị id thành ba phần
  let [idProduct, priceOrder, brandId] = id.split("-");

  // Kiểm tra xem các giá trị có hợp lệ không
  if (!idProduct) {
    return res.status(400).json({
      errcode: 1,
      errMessage: "Tham số không hợp lệ",
      filterProduct: [],
    });
  }

  let filterProduct = await Option_ProductServices.getFilterOption_Product(
    idProduct,
    priceOrder,
    brandId
  );

  let allImg = await Option_ImageService.getAllProductImage("ALL");
  let AllFeedBack = await Option_FeekBackService.getAllFeedBack("ALL");
  let Option_favorite = await Otion_favorite.getALlByUserFavorites(idUser);
  let Option_Product_All = null;

  filterProduct = Solve.solveDataReturn(
    filterProduct,
    allImg,
    AllFeedBack,
    Option_Product_All,
    Option_favorite
  );

  return res.status(200).json({
    errcode: 0,
    errMessage: "oke",
    filterProduct,
  });
};

let handleCreateOption_Products = async (req, res) => {
  let message = await Option_ProductServices.CreateOption_Product(req.body);
  return res.status(200).json(message);
};

let handleDeleteOption_Products = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Option_ProductServices.deleteOption_Product(req.body.id);

  return res.status(200).json(message);
};
let handleEditOption_Products = async (req, res) => {
  let data = req.body;
  let message = await Option_ProductServices.updateProductData(data);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllOption_Product: handlegetAllOption_Product,
  handlegetFilterProduct: handlegetFilterProduct,
  handleCreateOption_Products: handleCreateOption_Products,
  handleDeleteOption_Products: handleDeleteOption_Products,
  handleEditOption_Products: handleEditOption_Products,
  getDataCartByid: getDataCartByid,
};
