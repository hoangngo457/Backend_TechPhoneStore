import Discountservices from "../services/Discountservices";





let handlegetAllDiscount = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            Discount: []
        })

    }
    let Discount = await Discountservices.getAllDiscount(id);
    console.log(Discount);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OK',
        Discount

    })
}
let handleCreateDiscount = async(req, res) => {

      let message = await Discountservices.CreateDiscount(req.body);
      return res.status(200).json(message);
}
let handleDeleteDiscount = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await Discountservices.deleteDiscount(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditDiscount = async(req, res) => {
      let message = await Discountservices.updateDiscountData(req.body);
      console.log(message);
      return res.status(200).json(message);
    




}


module.exports = {
    handlegetAllDiscount: handlegetAllDiscount,
    handleCreateDiscount: handleCreateDiscount,
    handleDeleteDiscount: handleDeleteDiscount,
    handleEditDiscount: handleEditDiscount

}