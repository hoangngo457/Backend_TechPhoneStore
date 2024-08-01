import db from "../models/index";

let getDataOrder = (AllOrder, AllDetail, AllOpt, allImg) => {
  let dataOriginal = AllOrder;
  dataOriginal.forEach((element, index) => {
    dataOriginal[index].dataDetail = [];
    let dataFound = AllDetail.filter((e) => e.order_id == element.id);
    if (dataFound.length > 0) {
      let dataGet = AllOpt.filter((em) => findData(em, dataFound));
      let dataDetails = handleDataDetail(dataFound, dataGet, allImg);
      dataDetails.forEach((e) => {
        dataOriginal[index].dataDetail.push(e);
      });
    }
  });
  return dataOriginal;
};

function handleDataDetail(AllDetail, AllOpt, allImg) {
  let dataResult = [];
  AllDetail.forEach((e, index) => {
    let fund = AllOpt.find((ex) => ex.id == e.idOpt);
    if (fund) {
      let img = allImg.filter(
        (e) => e.idPro == fund.idPro && e.idColor == fund.idColor
      );
      AllDetail[index].img = img[0].image;
      AllDetail[index].dataProduct = fund;
    }
  });
  dataResult = AllDetail;
  return dataResult;
}

function findData(em, dataFound) {
  let fund = dataFound.find((ex) => em.id == ex.idOpt);
  if (fund) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getDataOrder: getDataOrder,
};
