const { Op } = require('sequelize');

const { searchMatch } = require('./functions');

class ApiFilter {
  /**
   * Converts request query into filtering, pagination and sorting.
   * Call new ApiFilter(query).query to get the built query.
   * @param {Object} query request query object
   */
  constructor(query, searchFields) {
    this.query = {};
    this.oldq = query;
    this.page;
    this.searchFields = searchFields;
    this.execute();
  }

  filter() {
    const excluded = ['page', 'limit', 'order', 'length', 'total', 'fields', 'range', 'text', 'consumed'];
    const newq = { ...this.oldq };
    excluded.forEach((e) => {
      if (newq[e]) delete newq[e];
    });
    this.query.where = newq;
  }

  pagination() {
    const { page, limit } = this.oldq;
    const p = +page || 1;
    const l = +limit || 50;
    this.page = p;
    this.query.offset = p * l - l;
    this.query.limit = l;
  }

  sort() {
    if (this.oldq.order) {
      const list = [];
      const values = this.oldq.order.split(',');
      values.forEach((value, i) => {
        if (i % 2 !== 0) return;
        const column = value;
        const order = values[i + 1] ? values[i + 1].toUpperCase() : 'ASC';

        list.push([column, order]);
      });
      this.query.order = list;
    }
  }

  fields() {
    if (!this.oldq.fields) return;
    this.query.attributes = this.oldq.fields.split(',');
  }
  range() {
    if (!this.oldq.range) return;
    // format: range=feildname,start,end
    // format: range=releasedDate,01/01/2022,01/01/2023
    const range = this.query.where.range;
    // splitting range value
    const queries = range.split(',');
    // redesigning range into object
    const obj = {};
    obj[Op.between] = [queries[1], queries[2]];

    this.query.where[queries[0]] = obj;
  }

  search() {
    if (!this.oldq.text) return;
    // const allText = this.oldq.text.split('-');
    const text = this.oldq.text.split('-').join(' ').toLowerCase();

    // building search option on fields
    let queryFields = searchMatch(this.searchFields, text);
    this.query.where[Op.or] = queryFields;
  }

  // working with date fields
  _releasedDate() {
    if (!this.query.where.releasedDate) return;
    // format: releasedDate=gte,02/02/2022
    const releasedDate = this.query.where.releasedDate;
    // splitting releasedDate value
    const queries = releasedDate.split(',');
    // redesigning releasedDate into object
    const obj = {};
    obj[Op[queries[0]]] = queries[1];

    this.query.where.releasedDate = obj;
  }
  _createdAt() {
    if (!this.query.where.createdAt) return;
    // format: createdAt=gte,02/02/2022
    const createdAt = this.query.where.createdAt;
    // splitting createdAt value
    const queries = createdAt.split(',');
    // redesigning createdAt into object
    const obj = {};
    obj[Op[queries[0]]] = queries[1];

    this.query.where.createdAt = obj;
  }
  _updatedAt() {
    if (!this.query.where.updatedAt) return;
    // format: updatedAt=gte,02/02/2022
    const updatedAt = this.query.where.updatedAt;
    // splitting updatedAt value
    const queries = updatedAt.split(',');
    // redesigning updatedAt into object
    const obj = {};
    obj[Op[queries[0]]] = queries[1];

    this.query.where.updatedAt = obj;
  }
  _passwordChangedAt() {
    if (!this.query.where.passwordChangedAt) return;
    // format: passwordChangedAt=gte,02/02/2022
    const passwordChangedAt = this.query.where.passwordChangedAt;
    // splitting passwordChangedAt value
    const queries = passwordChangedAt.split(',');
    // redesigning passwordChangedAt into object
    const obj = {};
    obj[Op[queries[0]]] = queries[1];

    this.query.where.passwordChangedAt = obj;
  }
  _rating() {
    if (!this.query.where.rating) return;
    // format: rating=gte,02/02/2022
    const rating = this.query.where.rating;
    // splitting rating value
    const queries = rating.split(',');
    // redesigning rating into object
    const obj = {};
    obj[Op[queries[0]]] = queries[1];

    this.query.where.rating = obj;
  }
  _date() {
    if (!this.query.where.date) return;
    // format: date=gte,02/02/2022
    const date = this.query.where.date;
    // splitting date value
    const queries = date.split(',');
    // redesigning date into object
    const obj = {};
    obj[Op[queries[0]]] = queries[1];

    this.query.where.date = obj;
  }

  // working witha array fields
  _withNotIn() {
    if (!this.query.where.notIn) return;
    // format: notIn=id,first_id,second_id,third_id
    const notin = this.query.where.notIn;
    const arr = notin.split(',');
    const field = arr.shift();
    const obj = {};
    obj[Op.notIn] = arr;
    this.query.where[field] = obj;

    delete this.query.where.notIn;
  }
  // working witha array fields
  _withIn() {
    if (!this.query.where.in) return;
    // format: notIn=id,first_id,second_id,third_id
    const notin = this.query.where.in;
    const arr = notin.split(',');
    const field = arr.shift();
    const obj = {};
    obj[Op.in] = arr;
    this.query.where[field] = obj;

    delete this.query.where.in;
  }

  dateQueries() {
    this._releasedDate();
    this._createdAt();
    this._updatedAt();
    this._passwordChangedAt();
    this._rating();
    this._date();
  }

  execute() {
    this.filter();
    this.fields();
    this.sort();
    this.pagination();
    this.dateQueries();
    this.range();
    this.search();
    //
    this._withIn();
    this._withNotIn();
  }
}

module.exports = ApiFilter;
