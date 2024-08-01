import guiemailServices from "../services/guiemailServices";

let emailcuaController = async (req, res) => {
  try {
    let infor = await guiemailServices.guiemail(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.error("Lỗi từ máy chủ:", e);
    return res.status(500).json({
      errcode: 1,
      message: "đã sảy ra lỗi",
    });
  }
};

module.exports = {
  emailcuaController: emailcuaController,
};
