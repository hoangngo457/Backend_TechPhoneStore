import db from "../models/index";

// extra hanlde support fe
let solveDataReturn = (
  data,
  dataImg,
  dataFeedback,
  data_all,
  Option_favorite
) => {
  let dataReSult = [];
  data.forEach((element) => {
    let foundSameProductColor = dataReSult.find(
      (item) =>
        item.product.id === element.idPro && item.color.id == element.idColor
    );
    let foundIndex = dataReSult.findIndex(
      (item) =>
        item.product.id === element.idPro && item.color.id == element.idColor
    );

    if (foundSameProductColor) {
      let foundSameRam = foundSameProductColor.ram.find(
        (item) => item.id === element.idRam
      );

      if (foundSameRam == undefined) {
        foundSameProductColor.ram.push(getDataRam(element, data));
      }

      // set replace
      dataReSult[foundIndex] = foundSameProductColor;
    } else {
      let dataSet = getDataOption(element, data, dataImg, data_all);
      let imgProduct = dataImg.filter(
        (item) =>
          item.idPro == dataSet.product.id && item.idColor == dataSet.color.id
      );

      let feedbackProduct = dataFeedback.filter(
        (item) => item.idOption_ProductsData.idPro == dataSet.product.id
      );

      let favFind = Option_favorite.find(
        (item) =>
          item.idOptionFavoriteData.idColor == dataSet.color.id &&
          dataSet.product.id == item.idOptionFavoriteData.idPro
      );
      feedbackProduct = getDataFeedBack(feedbackProduct, data_all);
      imgProduct = getDataImg(imgProduct);
      if (favFind) {
        dataSet.fav = true;
      }

      dataSet.img = imgProduct;
      dataSet.feedback = feedbackProduct;
      dataReSult.push(dataSet);
    }
  });

  function getDataFeedBack(array, data_all) {
    const arrayReturn = [];
    array.forEach((e) => {
      let found = null;
      if (data_all != null) {
        found = data_all.find((item) => item.id == e.idOpt);
      }

      const item = {
        dateCre: e.createdAt,
        rating: e.rating,
        content: e.comment,
        nameAssess: e.idUsersFeedBackData.fullName,
        ram: found == null ? "" : found.idRamData.nameRam,
        rom: found == null ? "" : found.idRomData.nameRom,
        color: found == null ? "" : found.idColorOptData.nameColor,
      };
      arrayReturn.push(item);
    });
    return arrayReturn;
  }

  function getDataImg(array) {
    const arrayReturn = [];
    array.forEach((e) => {
      const item = {
        img: e.image,
      };
      arrayReturn.push(item);
    });
    return arrayReturn;
  }

  function getColors(item, data, img) {
    let ResultColor = [];
    if (data == null) {
      return [];
    } else {
      let foundProductColorRam = data.filter(
        (itemR) => itemR.idPro == item.idPro
      );

      foundProductColorRam.forEach((e) => {
        let foundSameColor = ResultColor.find((itemX) => itemX.id == e.idColor);

        if (foundSameColor == undefined) {
          let imgProduct = img.filter(
            (item) => item.idPro == e.idPro && item.idColor == e.idColor
          );
          const color = {
            id: e.idColor,
            name: e.idColorOptData.nameColor,
            img: imgProduct[0].image,
          };
          ResultColor.push(color);
        }
      });
      return ResultColor;
    }
  }

  function getRomTextAll(item, data) {
    let ResultRom = [];
    if (data == null) {
      return "";
    } else {
      let foundProductColorRam = data.filter(
        (itemR) => itemR.idPro == item.idPro
      );

      foundProductColorRam.forEach((e) => {
        let foundSameColor = ResultRom.find((itemX) => itemX.id == e.idRom);

        if (foundSameColor == undefined) {
          const ram = {
            id: e.idRom,
            name: e.idRomData.nameRom,
          };
          ResultRom.push(ram);
        }
      });
      var text = "";
      for (var x = 0; x < ResultRom.length; x++) {
        if (ResultRom[x + 1] != null && ResultRom[x + 1] != undefined) {
          text = text + ResultRom[x].name + "/";
        } else {
          text = text + ResultRom[x].name;
        }
      }

      return text;
    }
  }

  function getRamTextAll(item, data) {
    let ResultRam = [];
    if (data == null) {
      return "";
    } else {
      let foundProductColorRam = data.filter(
        (itemR) => itemR.idPro == item.idPro
      );

      foundProductColorRam.forEach((e) => {
        let foundSameColor = ResultRam.find((itemX) => itemX.id == e.idRam);

        if (foundSameColor == undefined) {
          const ram = {
            id: e.idRam,
            name: e.idRamData.nameRam,
          };
          ResultRam.push(ram);
        }
      });
      var text = "";
      for (var x = 0; x < ResultRam.length; x++) {
        if (ResultRam[x + 1] != null && ResultRam[x + 1] != undefined) {
          text = text + ResultRam[x].name + "/";
        } else {
          text = text + ResultRam[x].name;
        }
      }

      return text;
    }
  }

  function getDataRam(item, data) {
    // fund roms depen
    let foundProductColorRam = data.filter(
      (itemR) =>
        itemR.idPro == item.idPro &&
        itemR.idColor == item.idColor &&
        itemR.idRam == item.idRam
    );

    const dataRoms = [];
    foundProductColorRam.forEach((e) => {
      const rom = {
        id: e.idRom,
        name: e.idRomData.nameRom,
        quantity: e.quantity,
        idOpt: e.id,
      };
      dataRoms.push(rom);
    });

    return {
      id: item.idRam,
      name: item.idRamData.nameRam,
      roms: dataRoms,
    };
  }

  function getDataOption(item, data, img, data_all) {
    let foundProductimg = img.filter(
      (itemR) => itemR.idPro == item.idPro && itemR.idColor == item.idColor
    );

    return {
      fav: false,
      CodeOption: item.id,
      sold: item.sold,
      price: item.price,
      img: [],
      feedback: [],
      color: {
        id: item.idColor,
        name: item.idColorOptData.nameColor,
        img: foundProductimg[0].image,
      },
      colors: getColors(item, data_all, img),
      product: {
        id: item.idPro,
        name: item.idProductsData.name,
        cpu: item.idProductsData.cpu,
        display: item.idProductsData.display,
        camera: item.idProductsData.camera,
        battery: item.idProductsData.battery,
        os: item.idProductsData.os,
        ram: getRamTextAll(item, data_all),
        rom: getRomTextAll(item, data_all),
        idBrand: item.idProductsData.idBrand,
      },
      ram: [getDataRam(item, data)],
    };
  }

  return dataReSult;
};

let solveDataReturn_V2 = (
  data,
  dataImg,
  dataFeedback,
  data_all,
  Option_favorite
) => {
  let dataReSult = [];
  data.forEach((element) => {
    let dataSet = getDataOption(element, data, dataImg, data_all);
    let imgProduct = dataImg.filter(
      (item) =>
        item.idPro == dataSet.product.id && item.idColor == dataSet.color.id
    );

    let feedbackProduct = dataFeedback.filter(
      (item) => item.idOption_ProductsData.idPro == dataSet.product.id
    );

    let favFind = Option_favorite.find(
      (item) =>
        item.idOptionFavoriteData.idColor == dataSet.color.id &&
        dataSet.product.id == item.idOptionFavoriteData.idPro
    );
    feedbackProduct = getDataFeedBack(feedbackProduct, data_all);
    imgProduct = getDataImg(imgProduct);
    if (favFind) {
      dataSet.fav = true;
    }
    dataSet.img = imgProduct;
    dataSet.feedback = feedbackProduct;
    dataReSult.push(dataSet);
  });

  function getDataFeedBack(array, data_all) {
    const arrayReturn = [];
    array.forEach((e) => {
      let found = null;
      if (data_all != null) {
        found = data_all.find((item) => item.id == e.idOpt);
      }

      const item = {
        dateCre: e.createdAt,
        rating: e.rating,
        content: e.comment,
        nameAssess: e.idUsersFeedBackData.fullName,
        ram: found == null ? "" : found.idRamData.nameRam,
        rom: found == null ? "" : found.idRomData.nameRom,
        color: found == null ? "" : found.idColorOptData.nameColor,
      };
      arrayReturn.push(item);
    });
    return arrayReturn;
  }

  function getDataImg(array) {
    const arrayReturn = [];
    array.forEach((e) => {
      const item = {
        img: e.image,
      };
      arrayReturn.push(item);
    });
    return arrayReturn;
  }

  function getColors(item, data, img) {
    let ResultColor = [];
    if (data == null) {
      return [];
    } else {
      let foundProductColorRam = data.filter(
        (itemR) => itemR.idPro == item.idPro
      );

      foundProductColorRam.forEach((e) => {
        let foundSameColor = ResultColor.find((itemX) => itemX.id == e.idColor);

        if (foundSameColor == undefined) {
          let imgProduct = img.filter(
            (item) => item.idPro == e.idPro && item.idColor == e.idColor
          );
          const color = {
            id: e.idColor,
            name: e.idColorOptData.nameColor,
            img: imgProduct[0].image,
          };
          ResultColor.push(color);
        }
      });
      return ResultColor;
    }
  }

  function getRomTextAll(item, data) {
    let ResultRom = [];
    if (data == null) {
      return "";
    } else {
      let foundProductColorRam = data.filter(
        (itemR) => itemR.idPro == item.idPro
      );

      foundProductColorRam.forEach((e) => {
        let foundSameColor = ResultRom.find((itemX) => itemX.id == e.idRom);

        if (foundSameColor == undefined) {
          const ram = {
            id: e.idRom,
            name: e.idRomData.nameRom,
          };
          ResultRom.push(ram);
        }
      });
      var text = "";
      for (var x = 0; x < ResultRom.length; x++) {
        if (ResultRom[x + 1] != null && ResultRom[x + 1] != undefined) {
          text = text + ResultRom[x].name + "/";
        } else {
          text = text + ResultRom[x].name;
        }
      }

      return text;
    }
  }

  function getRamTextAll(item, data) {
    let ResultRam = [];
    if (data == null) {
      return "";
    } else {
      let foundProductColorRam = data.filter(
        (itemR) => itemR.idPro == item.idPro
      );

      foundProductColorRam.forEach((e) => {
        let foundSameColor = ResultRam.find((itemX) => itemX.id == e.idRam);

        if (foundSameColor == undefined) {
          const ram = {
            id: e.idRam,
            name: e.idRamData.nameRam,
          };
          ResultRam.push(ram);
        }
      });
      var text = "";
      for (var x = 0; x < ResultRam.length; x++) {
        if (ResultRam[x + 1] != null && ResultRam[x + 1] != undefined) {
          text = text + ResultRam[x].name + "/";
        } else {
          text = text + ResultRam[x].name;
        }
      }

      return text;
    }
  }

  function getDataRam(item, data) {
    // fund roms depen
    let foundProductColorRam = data.filter(
      (itemR) =>
        itemR.idPro == item.idPro &&
        itemR.idColor == item.idColor &&
        itemR.idRam == item.idRam
    );

    const dataRoms = [];
    foundProductColorRam.forEach((e) => {
      const rom = {
        id: e.idRom,
        name: e.idRomData.nameRom,
        quantity: e.quantity,
      };
      dataRoms.push(rom);
    });

    return {
      id: item.idRam,
      name: item.idRamData.nameRam,
      roms: dataRoms,
    };
  }

  function getDataOption(item, data, img, data_all) {
    let foundProductimg = img.filter(
      (itemR) => itemR.idPro == item.idPro && itemR.idColor == item.idColor
    );

    return {
      fav: false,
      CodeOption: item.id,
      sold: item.sold,
      price: item.price,
      img: [],
      feedback: [],
      color: {
        id: item.idColor,
        name: item.idColorOptData.nameColor,
        img: foundProductimg[0].image,
      },
      colors: getColors(item, data_all, img),
      product: {
        id: item.idPro,
        name: item.idProductsData.name,
        cpu: item.idProductsData.cpu,
        display: item.idProductsData.display,
        camera: item.idProductsData.camera,
        battery: item.idProductsData.battery,
        os: item.idProductsData.os,
        ram: getRamTextAll(item, data_all),
        rom: getRomTextAll(item, data_all),
        idBrand: item.idProductsData.idBrand,
      },
      ram: [getDataRam(item, data)],
    };
  }

  return dataReSult;
};

module.exports = {
  solveDataReturn: solveDataReturn,
  solveDataReturn_V2: solveDataReturn_V2,
};
