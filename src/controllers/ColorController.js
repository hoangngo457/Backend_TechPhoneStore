import Colorservices from "../services/ColorServices";





let handlegetAllColor = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require paColoreters',
            Color: []
        })

    }
    let Color = await Colorservices.getAllColor(id);
    console.log(Color);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OK',
        Color

    })
}
let handleCreateColor = async(req, res) => {

      let message = await Colorservices.CreateColor(req.body);
      return res.status(200).json(message);
}
let handleDeleteColor = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required paColoreters !"

        })
    }
    let message = await Colorservices.deleteColor(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditColor = async(req, res) => {
      let message = await Colorservices.updateColorData(req.body);
      console.log(message);
      return res.status(200).json(message);
    




}


module.exports = {
    handlegetAllColor: handlegetAllColor,
    handleCreateColor: handleCreateColor,
    handleDeleteColor: handleDeleteColor,
    handleEditColor: handleEditColor

}