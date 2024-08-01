import FeedBackservices from "../services/FeedBackServices";

let handlegetAllFeedBack = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      FeedBack: [],
    });
  }
  let FeedBack = await FeedBackservices.getAllFeedBack(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    FeedBack,
  });
};


let handleCreateFeedBack = async (req, res) => {
  let message = await FeedBackservices.CreateFeedBack(req.body);
  return res.status(200).json(message);
};

let handleDeleteFeedBack = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await FeedBackservices.deleteFeedBack(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditFeedBack = async (req, res) => {
  let message = await FeedBackservices.updateFeedBackData(req.body);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllFeedBack: handlegetAllFeedBack,
  handleCreateFeedBack: handleCreateFeedBack,
  handleDeleteFeedBack: handleDeleteFeedBack,
  handleEditFeedBack: handleEditFeedBack,
};
