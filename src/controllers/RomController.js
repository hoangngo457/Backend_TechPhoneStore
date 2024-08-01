import Romservices from "../services/RomServices";





let handlegetAllRom = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            Rom: []
        })

    }
    let Rom = await Romservices.getAllRom(id);
    console.log(Rom);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OK',
        Rom

    })
}
let handleCreateRom = async(req, res) => {

      let message = await Romservices.CreateRom(req.body);
      return res.status(200).json(message);
}
let handleDeleteRom = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required paRameters !"

        })
    }
    let message = await Romservices.deleteRom(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditRom = async(req, res) => {
      let message = await Romservices.updateRomData(req.body);
      console.log(message);
      return res.status(200).json(message);
    




}


module.exports = {
    handlegetAllRom: handlegetAllRom,
    handleCreateRom: handleCreateRom,
    handleDeleteRom: handleDeleteRom,
    handleEditRom: handleEditRom

}