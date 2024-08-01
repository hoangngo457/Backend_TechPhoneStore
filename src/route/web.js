import express from "express";
import userController from "../controllers/userController";
import cloudinaryConfig from "../config/cloudinaryConfig";
import brandController from "../controllers/brandController";
import productimageController from "../controllers/imageImageController";
import productController from "../controllers/productController";
import Option_ProductController from "../controllers/optionproductController";
import OrderController from "../controllers/orderController";
import OrderdetailController from "../controllers/orderdetailController";
import AddressController from "../controllers/addressController";
import CartController from "../controllers/cartController";
import FavoritesController from "../controllers/favoriteController";
import FeedBackController from "../controllers/feedbackController";
import DiscountController from "../controllers/discountController";
import RamController from "../controllers/RamController";
import RomController from "../controllers/RomController";
import ColorController from "../controllers/ColorController";
import emailController from "../controllers/emailController";

let router = express.Router();

let initWebRouters = (app) => {
  //api cua User
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post(
    "/api/create-new-user",
    cloudinaryConfig.single("image"),
    userController.handleCreateNewUser
  );
  router.put(
    "/api/edit-user",
    cloudinaryConfig.single("image"),
    userController.handleEditUser
  );
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.put("/api/changepassword", userController.handleChangePassword);

  //api cua brand
  router.post(
    "/api/create-new-brand",
    cloudinaryConfig.single("image"),
    brandController.handleCreateBrand
  );
  router.delete("/api/delete-brand", brandController.handleDeleteBrand);
  router.put(
    "/api/edit-brand",
    cloudinaryConfig.single("image"),
    brandController.handleEditBrand
  );
  router.get("/api/get-all-brand", brandController.handlegetAllBrand);

  //api của product_Image

  router.post(
    "/api/create-new-product-image",
    cloudinaryConfig.array("image", 10),
    productimageController.handleCreateProductImage
  );
  router.delete(
    "/api/delete-product-image",
    productimageController.handleDeleteProductImage
  );
  router.put(
    "/api/edit-product-image",
    cloudinaryConfig.single("image"),
    productimageController.handleEditProductImage
  );

  router.get(
    "/api/get-all-product-image",
    productimageController.handlegetAllProductImage
  );

  // api của product
  router.get("/api/get-all-products", productController.handlegetAllProduct);

  router.post(
    "/api/create-new-products",
    productController.handleCreateProducts
  );
  router.put("/api/edit-products", productController.handleEditProducts);
  router.delete("/api/delete-products", productController.handleDeleteProducts);

  //api option_product

  router.get(
    "/api/get-all-option-product",
    Option_ProductController.handlegetAllOption_Product
  );
  router.get(
    "/api/get-filter-option-product",
    Option_ProductController.handlegetFilterProduct
  );
  router.post(
    "/api/create-new-option_product",
    Option_ProductController.handleCreateOption_Products
  );
  router.put(
    "/api/edit-option_product",
    Option_ProductController.handleEditOption_Products
  );
  router.delete(
    "/api/delete-option_product",
    Option_ProductController.handleDeleteOption_Products
  );

  //api cua Order'
  router.get("/api/rebuy_order", OrderController.handleReBuy);
  router.post("/api/create-new-Order", OrderController.handleCreateOrder);
  router.delete("/api/delete-Order", OrderController.handleDeleteOrder);
  router.put("/api/edit-Order", OrderController.handleEditOrder);
  router.get("/api/get-all-Order", OrderController.handlegetAllOrder);
  router.get(
    "/api/get-all-Order-User",
    OrderController.handlegetAllOrderByIdUser
  );

  //api của orderdetail
  //api cua Orderdetail
  router.post(
    "/api/create-new-Orderdetail",
    OrderdetailController.handleCreateOrderdetail
  );
  router.delete(
    "/api/delete-Orderdetail",
    OrderdetailController.handleDeleteOrderdetail
  );
  router.put(
    "/api/edit-Orderdetail",

    OrderdetailController.handleEditOrderdetail
  );
  router.get(
    "/api/get-all-Orderdetail",
    OrderdetailController.handlegetAllOrderdetail
  );

  // api cua address
  router.post("/api/create-new-Address", AddressController.handleCreateAddress);
  router.delete("/api/delete-Address", AddressController.handleDeleteAddress);
  router.put(
    "/api/edit-Address",

    AddressController.handleEditAddress
  );
  router.get("/api/get-all-Address", AddressController.handlegetAllAddress);
  router.get(
    "/api/get-all-Address-by-Iduser",
    AddressController.handlegetAllAddressByIdUser
  );

  // api cua Cart
  router.post("/api/create-new-Cart", CartController.handleCreateCart);
  router.delete("/api/delete-Cart", CartController.handleDeleteCart);
  router.put(
    "/api/edit-Cart",

    CartController.handleEditCart
  );
  router.get("/api/get-all-Cart", CartController.handlegetAllCart);
  router.get(
    "/api/get-all-Cart-by-User",
    CartController.handlegetAllCartByUser
  );

  // api cua Favorites
  router.post(
    "/api/create-new-Favorites",
    FavoritesController.handleCreateFavorites
  );

  router.put(
    "/api/edit-Favorites",

    FavoritesController.handleEditFavorites
  );
  router.get(
    "/api/get-all-Favorites",
    FavoritesController.handlegetAllFavorites
  );
  router.get(
    "/api/get-Favorites-User",
    FavoritesController.handlegetByUserFavorites
  );
  router.delete(
    "/api/delete-Favorites",
    FavoritesController.handleDeleteFavoritesByidAll
  );

  // api feedback
  // api cua FeedBack
  router.post(
    "/api/create-new-FeedBack",
    FeedBackController.handleCreateFeedBack
  );
  router.delete(
    "/api/delete-FeedBack",
    FeedBackController.handleDeleteFeedBack
  );
  router.put(
    "/api/edit-FeedBack",

    FeedBackController.handleEditFeedBack
  );
  router.get("/api/get-all-FeedBack", FeedBackController.handlegetAllFeedBack);

  // api cua Discount
  router.post(
    "/api/create-new-Discount",
    DiscountController.handleCreateDiscount
  );
  router.delete(
    "/api/delete-Discount",
    DiscountController.handleDeleteDiscount
  );
  router.put(
    "/api/edit-Discount",

    DiscountController.handleEditDiscount
  );
  router.get("/api/get-all-Discount", DiscountController.handlegetAllDiscount);

  // api cua Ram
  router.post("/api/create-new-Ram", RamController.handleCreateRam);
  router.delete("/api/delete-Ram", RamController.handleDeleteRam);
  router.put(
    "/api/edit-Ram",

    RamController.handleEditRam
  );
  router.get("/api/get-all-Ram", RamController.handlegetAllRam);

  // api cua Rom
  router.post("/api/create-new-Rom", RomController.handleCreateRom);
  router.delete("/api/delete-Rom", RomController.handleDeleteRom);
  router.put(
    "/api/edit-Rom",

    RomController.handleEditRom
  );
  router.get("/api/get-all-Rom", RomController.handlegetAllRom);

  // api cua Color
  router.post("/api/create-new-Color", ColorController.handleCreateColor);
  router.delete("/api/delete-Color", ColorController.handleDeleteColor);
  router.put(
    "/api/edit-Color",

    ColorController.handleEditColor
  );
  router.get("/api/get-all-Color", ColorController.handlegetAllColor);

  //api gui email
  router.post("/api/guiemail", emailController.emailcuaController);

  return app.use("/", router);
};
module.exports = initWebRouters;
