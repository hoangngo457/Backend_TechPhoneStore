import ProductImageservices from "../services/productImageServices";
import { v2 as cloudinary } from "cloudinary";



let handlegetAllProductImage = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            products: []
        })

    }
    let ProductImage = await ProductImageservices.getAllProductImage(id);
    console.log(ProductImage);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OK',
        ProductImage

    })
}

let handleCreateProductImage = async (req, res) => {
    let filesData = req.files; // Sử dụng req.files để nhận nhiều tệp
  
    if (filesData && filesData.length > 0) {
      try {
        // Tạo dữ liệu để lưu vào cơ sở dữ liệu, bao gồm URL và filename
        let data = filesData.map(file => ({
            image: file.path,
            filename: file.filename,
            idPro: req.body.idPro,
            idColor:req.body.idColor
         
        }));
  
        // Gọi dịch vụ để tạo sản phẩm với các URL và filenames
        let message = await ProductImageservices.CreateProductImage(data);
  
        console.log(message);
        return res.status(200).json(message);
      } catch (error) {
        console.error('Error while creating product images:', error);
  
        // Xóa các tệp đã tải lên nếu có lỗi xảy ra
        filesData.forEach(file => {
          cloudinary.uploader.destroy(file.filename, (err, result) => {
            if (err) console.error('Error while deleting image:', err);
            else console.log('Image deleted:', result);
          });
        });
  
        return res.status(500).json({ error: 'An error occurred while creating product images' });
      }
    } else {
      return res.status(400).json({ error: 'No files uploaded' });
    }
  }
  



let handleDeleteProductImage = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await ProductImageservices.deleteProductImage(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditProductImage = async(req, res) => {
    let fileData = req.file;

    if (fileData!=undefined) {
      let message = await ProductImageservices.updateProductImageData(req.body, fileData);
      console.log(message);
      return res.status(200).json(message);
    } else {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);// khi  bị lỗi nó sẽ  không upload ảnh
      let message = await ProductImageservices.updateProductImageData(req.body, fileData?.path);
      return res.status(200).json(message);
    }




}


module.exports = {
    handlegetAllProductImage: handlegetAllProductImage,
    handleCreateProductImage: handleCreateProductImage,
    handleDeleteProductImage: handleDeleteProductImage,
    handleEditProductImage: handleEditProductImage

}