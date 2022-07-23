const { createId, catchAsync } = require("../utils/utils");
const ApiFilter = require("../utils/apiFilter");
const { Op } = require("sequelize");
const sequelize = require("../db");
const { searchMatch } = require("../utils/functions");

let nOfInstance = 0;
exports.createInstance = async (Model, body) => {
  try {
    // creating an id
    body.id = createId();
    // creating the data
    const data = await Model.create(body);
    // resetting nOfInstance to 0
    nOfInstance = 0;
    return data;
  } catch (error) {
    // recreating the data if id repeats
    if (error.fields && error.fields.id && nOfInstance < 5) {
      nOfInstance++;
      return await this.createInstance(Model, body);
    }
    // throwing the error if its not about id
    nOfInstance = 0;
    throw error;
  }
};

//

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await this.createInstance(Model, req.body);

    res.status(201).json({
      status: "success",
      data,
    });
  });

//

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = new ApiFilter(req.query).query;
    console.log(query);
    const data = await Model.findAll(query);
    const total = await Model.count({ where: query.where });

    res.status(200).json({
      status: "success",
      total,
      length: data.length,
      data,
    });
  });

//

exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    const meta = await Model.update(req.body, { where: { id: req.params.id } });
    const data = await Model.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      meta,
      data,
    });
  });

//

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      meta: data,
    });
  });

//

exports.getOne = (Model, include = undefined) =>
  catchAsync(async (req, res, next) => {
    let data;
    if (include) data = await Model.findByPk(req.params.id, { include });
    if (!include) data = await Model.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      data,
    });
  });

//

exports.search = (Model, fields) =>
  catchAsync(async (req, res, next) => {
    const text = req.params.text.split("-").join(" ").toLowerCase();

    // building search option on fields
    const queryFields = searchMatch(fields, text);

    // creating queries
    const api = new ApiFilter(req.query);
    const query = api.query;
    query.where = { [Op.or]: queryFields };

    // making queries
    const data = await Model.findAll(query);
    const total = await Model.count({ where: query.where });

    res.status(200).json({
      status: "success",
      meta: {
        length: data.length,
        page: api.page,
        limit: query.limit,
        total,
      },
      data,
    });
  });
