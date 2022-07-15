const { createId } = require("../utils/utils");
const { checkIdError } = require("../utils/errors");

let nOfInstance = 0;
exports.createInstance = async (Model, body) => {
  try {
    body.id = createId();
    const data = await Model.create(body);
    nOfInstance = 0;
    return data;
  } catch (error) {
    // const err = checkIdError(error);
    if (error.fields && error.fields.id && nOfInstance < 5) {
      nOfInstance++;
      return await this.createInstance(Model, body);
    }
    nOfInstance = 0;
    throw error;
  }
};

//
