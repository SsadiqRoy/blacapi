const {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
} = require("../middlewares/globalMiddleware");
const Screenshot = require("../model/screenshots");
const { catchAsync } = require("../utils/utils");

//

//

exports.addScreenshot = create(Screenshot);
exports.updateScreenshot = update(Screenshot);
exports.deleteScreenshot = deleteOne(Screenshot);
exports.allScreenshots = getAll(Screenshot);
exports.oneScreenshot = getOne(Screenshot);
//

exports.productsScreenshots = catchAsync(async (req, res, next) => {
  let product = req.params.product;
  let data;

  if (product === "movie") {
    data = await Screenshot.findAll({ where: { movie: req.params.id } });
  }

  if (product === "series") {
    data = await Screenshot.findAll({ where: { movie: req.params.id } });
  }

  if (product === "games") {
    data = await Screenshot.findAll({ where: { movie: req.params.id } });
  }

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});
