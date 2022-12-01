const Link = require('../model/links');
const { catchAsync } = require('../utils/utils');
const global = require('../middlewares/globalMiddleware');
//

//

exports.createLink = global.create(Link);
exports.updateLink = global.update(Link);
exports.deleteLink = global.deleteOne(Link);
exports.oneLink = global.getOne(Link);
exports.allLinks = global.getAll(Link);

//
exports.productLinks = catchAsync(async (req, res, next) => {
  let product = req.params.product;
  let links;
  if (product === 'movie') {
    links = await Link.findAll({ where: { movie: req.params.id } });
  }
  if (product === 'episode') {
    links = await Link.findAll({ where: { episode: req.params.id } });
  }
  if (product === 'game') {
    links = await Link.findAll({ where: { game: req.params.id } });
  }

  res.status(200).json({
    status: 'success',
    length: links.length,
    data: links,
  });
});
