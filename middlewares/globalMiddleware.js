const { createId, catchAsync } = require('../utils/utils');
const ApiFilter = require('../utils/apiFilter');
const { Op } = require('sequelize');
const sequelize = require('../db');
const { searchMatch } = require('../utils/functions');

let nOfInstance = 0;
/**
 * Inserts data into a table
 * @param {Object} Model sequelize schema
 * @param {Object} body data to save to the data base
 * @returns Object - created data
 */
exports.createInstance = async (Model, body) => {
  try {
    // console.log('🔥', Model);
    // console.log('🔥', body);
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
/**
 * creates/saves data into the database
 * @param {Objext} Model sequelize schema
 * @returns null - sends response
 */
exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await this.createInstance(Model, req.body);

    res.status(201).json({
      status: 'success',
      data,
    });
  });

//
/**
 * selects all documents of a table
 *
 * search for matching data in a table. More fields are added if more fields are to be considered in the search
 * @param {Object} Model sequelize schema
 * @param {[Array]} fields [ [colums name, string(0) | array(1)] ] - Array of arrays
 * @returns null  - sends response
 *
 * each sub array in the array of fields should contain the name of a column and a number (0 or 1) indicating whether the field is String or Array respectively
 */
exports.getAll = (Model, fields) =>
  catchAsync(async (req, res, next) => {
    const oldQuery = { ...req.query };

    const api = new ApiFilter(req.query, fields);
    const query = api.query;

    const data = await Model.findAll(query);
    const total = await Model.count({ where: query.where });

    const meta = {
      total,
      length: data.length,
      consumed: (api.page - 1) * query.limit + data.length,
      page: api.page,
      limit: query.limit,
      text: oldQuery.text,
    };
    meta.next = meta.total - meta.consumed;

    // adding suggestions when less content is found in a search
    let suggestion = [];
    if (meta.page < 2 && meta.length < meta.limit) {
      const exclude = data.map((data) => data.id);
      suggestion = await suggestions(Model, api, exclude);
    }

    res.status(200).json({
      status: 'success',
      meta: { ...oldQuery, ...meta },
      data,
      suggestions: suggestion,
    });
  });

//
/**
 * update a document and sends the updated document as response
 * @param {Object} Model sequelize schema
 * @returns null - sends response
 */
exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    const meta = await Model.update(req.body, { where: { id: req.params.id } });
    const data = await Model.findByPk(req.params.id);

    res.status(200).json({
      status: 'success',
      meta,
      data,
    });
  });

//
/**
 * delets a doucment from a table
 * @param {Object} Model Sequlize Schema
 * @returns null  - sends response
 */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByPk(req.params.id);
    await Model.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: 'success',
      meta: data,
    });
  });

//
/**
 * selects one document from a table, can pupulate other associations
 * @param {Object} Model sequlize schema
 * @param {Array} include fields to populate
 * @returns null  - sends response
 */
exports.getOne = (Model, include = undefined, order = undefined) =>
  catchAsync(async (req, res, next) => {
    let data;
    if (include) data = await Model.findByPk(req.params.id, { include, order });
    if (!include) data = await Model.findByPk(req.params.id);

    res.status(200).json({
      status: 'success',
      data,
    });
  });

/*









*/

/**
 * Suggest more documents when the first page query does not contain enought data in a search
 * @param {Object} Model sequelize Schema
 * @param {Class} filter queryFilter instance
 * @param {Array} exclude ids to exclude when making query
 * @returns Array = query documents
 */
async function suggestions(Model, filter, exclude) {
  if (!filter.oldq.text) return;
  const query = filter.query;
  const texts = filter.oldq.text.split('-');

  // creating a search query for each word
  let allFields = [];
  texts.forEach((t) => {
    const searchFields = searchMatch(filter.searchFields, t);

    allFields = [...allFields, ...searchFields];
  });
  // associating the new where clause of the query
  query.offset = 0;
  query.limit = 20;
  query.where[Op.or] = allFields;
  // adding excluded id to the query
  query.where.id = { [Op.notIn]: exclude };
  const data = await Model.findAll(query);

  return data.splice(0, 12);
}
