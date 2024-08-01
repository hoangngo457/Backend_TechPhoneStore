import db from "../models/index";

let getDataFavorite = (optionProduct, dataFavorite) => {
  let dataResult = [];
  optionProduct.forEach((element) => {
    let found = dataFavorite.find(
      (item) =>
        element.product.id == item.idOptionFavoriteData.idPro &&
        element.color.id == item.idOptionFavoriteData.idColor
    );

    if (found) {
      dataResult.push(element);
    }
  });
  return dataResult;
};

module.exports = {
  getDataFavorite: getDataFavorite,
};
