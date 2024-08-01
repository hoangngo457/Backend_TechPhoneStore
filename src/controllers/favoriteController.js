import Favoritesservices from "../services/FavoritesServices";

import Option_ImageService from "../services/productImageServices";
import Option_FeekBackService from "../services/FeedBackServices";
import productService from "../services/optionproductServices";
import Solve from "../solve/solve";
import SolveFavorite from "../solve/solveFavorite";
import Otion_favorite from "../services/FavoritesServices";

let handlegetByUserFavorites = async (req, res) => {
  let id = req.query.id; //idUser
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      Favorites: [],
    });
  }

  let ProductResult = null;
  let allProduct = await productService.getAllOption_Product("ALL");
  let allImg = await Option_ImageService.getAllProductImage("ALL");
  let AllFeedBack = await Option_FeekBackService.getAllFeedBack("ALL");
  let Option_favorite = await Otion_favorite.getALlByUserFavorites(id);

  ProductResult = Solve.solveDataReturn(allProduct, allImg, AllFeedBack, null, Option_favorite);
  let Favorites = await Favoritesservices.getALlByUserFavorites(id);
  let result = SolveFavorite.getDataFavorite(ProductResult, Favorites);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    result
  });
};

let handleDeleteFavoritesByidAll = async (req, res) => {
  let idUSer = req.query.idUser;
  let idPro = req.query.idPro;
  let idColor = req.query.idColor;

  if (!idUSer || !idPro || !idColor) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      Favorites: [],
    });
  }

  let allProduct = await productService.getAllOption_Product("ALL");
  
  let found = allProduct.filter(
    (item) => item.idColor == idColor && item.idPro == idPro
  );

  found.forEach((element) => {
    Favoritesservices.deleteFavorites(element.id, idUSer);
  });

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
  });
};

let handlegetAllFavorites = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      Favorites: [],
    });
  }
  let Favorites = await Favoritesservices.getAllFavorites(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Favorites,

  });
};

let handleCreateFavorites = async (req, res) => {
  let idPro = req.query.idPro;
  let idColor = req.query.idColor;
  let idUSer = req.query.idUser;

  let allProduct = await productService.getAllOption_Product("ALL");
  let found = allProduct.find(
    (item) => item.idColor == idColor && item.idPro == idPro
  );
  let message = await Favoritesservices.CreateFavorites_V2(found.id, idUSer);
  return res.status(200).json(message);
};

let handleDeleteFavorites = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Favoritesservices.deleteFavorites(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditFavorites = async (req, res) => {
  let message = await Favoritesservices.updateFavoritesData(req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllFavorites: handlegetAllFavorites,
  handleCreateFavorites: handleCreateFavorites,
  handleDeleteFavorites: handleDeleteFavorites,
  handleEditFavorites: handleEditFavorites,
  handlegetByUserFavorites: handlegetByUserFavorites,
  handleDeleteFavoritesByidAll: handleDeleteFavoritesByidAll,
};
