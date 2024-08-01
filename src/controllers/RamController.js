import Ramservices from "../services/Ramservices";





let handlegetAllRam = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            Ram: []
        })

    }
    let Ram = await Ramservices.getAllRam(id);
    console.log(Ram);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OK',
        Ram

    })
}
let handleCreateRam = async(req, res) => {

      let message = await Ramservices.CreateRam(req.body);
      return res.status(200).json(message);
}
let handleDeleteRam = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await Ramservices.deleteRam(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditRam = async(req, res) => {
      let message = await Ramservices.updateRamData(req.body);
      console.log(message);
      return res.status(200).json(message);
    




}


module.exports = {
    handlegetAllRam: handlegetAllRam,
    handleCreateRam: handleCreateRam,
    handleDeleteRam: handleDeleteRam,
    handleEditRam: handleEditRam

}