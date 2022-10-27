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
    console.log('🔥', Model);
    console.log('🔥', body);
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
 * @param {Object} Model sequelize schema
 * @returns null - sends response
 */
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const api = new ApiFilter(req.query);
    const query = api.query;

    console.log('👉', query);
    const data = await Model.findAll(query);
    const total = await Model.count({ where: query.where });

    const meta = {
      length: data.length,
      page: api.page,
      limit: query.limit,
      total,
      text: req.query.text,
    };

    res.status(200).json({
      status: 'success',
      meta,
      data,
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

//
/**
 * search for matching data in a table. More fields are added if more fields are to be considered in the search
 * @param {Object} Model sequlize schema
 * @param {[Array]} fields [ [colums name, string(0) | array(1)] ] - Array of arrays
 * @returns null  - sends response
 * each sub array in the array of fields should contain the name of a column and a number (0 or 1) indicating whether the field is String or Array respectively
 */
exports.search = (Model, fields) =>
  catchAsync(async (req, res, next) => {
    const oldQuery = { ...req.query };
    const allText = req.query.text.split('-');
    const text = req.query.text.split('-').join(' ').toLowerCase();

    // building search option on fields
    let queryFields = searchMatch(fields, text);

    // creating queries
    const api = new ApiFilter(req.query);
    const query = api.query;
    query.where = { [Op.or]: queryFields };

    console.log('👉', query.where);

    // making queries
    const data = await Model.findAll(query);
    const total = await Model.count({ where: query.where });

    const meta = {
      length: data.length,
      page: api.page,
      limit: query.limit,
      total,
      text,
    };

    //

    //
    // ============== REMAKING THE  QUERY AGAIN WIHT THE WORDS SPLIT TO INDIVIDUAL
    // id of already found items to exclued
    const notInIds = data.map((data) => data.id);
    // desingin an new query
    const newApi = new ApiFilter(oldQuery);
    const newQuery = newApi.query;
    // creating a search query for each word
    let newQueryFieldArr = [];
    allText.forEach((t) => {
      const newQueryFields = searchMatch(fields, t);

      console.log('👉', newQueryFields[3]);
      newQueryFieldArr = [...newQueryFieldArr, ...newQueryFields];
    });
    // associating the new where clause of the query
    newQuery.where = { [Op.or]: newQueryFieldArr };
    // adding excluded id to the query
    newQuery.where.id = { [Op.notIn]: notInIds };
    const newData = await Model.findAll(newQuery);

    console.log('👉', newQuery.where);

    //

    //

    res.status(200).json({
      status: 'success',
      meta,
      data,
      suggestion: newData,
    });
  });
