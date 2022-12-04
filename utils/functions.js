const { Op } = require('sequelize');
const sequelize = require('../db');

/**
 * builds search options on to be searched on each field(column) with the search text.
 * Inner Array of fields should contain [String, Number].
 * String - name of culumns.
 * Number - column DataType (0/1)(STRING/JSON).
 * @param {[[String, Number]]} fields Array of Array of length 2,
 * @param {String} text search string
 * @returns Array of objects
 */
exports.searchMatch = (fields, text) => {
  // a list to contain all the query option to be inserted in Op.or in the where clause
  const queryFields = [];

  // creating query options on fields
  fields.forEach(([f, i]) => {
    // checking if query field is a string data type
    if (i === 0) {
      const option = {};
      option[f] = {
        [Op.like]: `%${text}%`,
      };
      queryFields.push(option);
    } else {
      // desinging query for field JSON data type
      const op2 = sequelize.fn(
        'JSON_CONTAINS',
        sequelize.col(f),
        sequelize.literal(`'"${text}"'`),
        sequelize.literal("'$'")
      );

      queryFields.push(op2);
    }
  });
  return queryFields;
};
