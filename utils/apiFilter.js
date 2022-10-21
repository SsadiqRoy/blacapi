class ApiFilter {
  /**
   * Converts request query into filtering, pagination and sorting.
   * Call new ApiFilter(query).query to get the built query.
   * @param {Object} query request query object
   */
  constructor(query) {
    this.query = {};
    this.oldq = query;
    this.page;
    this.execute();
  }

  filter() {
    const excluded = ['page', 'limit', 'order'];
    const newq = { ...this.oldq };
    excluded.forEach((e) => {
      if (newq[e]) delete newq[e];
    });
    this.query.where = newq;
  }

  pagination() {
    const { page, limit } = this.oldq;
    const p = +page || 1;
    const l = +limit || 100;
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
        // console.log([value, values[i + 1]]);
        list.push([column, order]);
      });
      this.query.order = list;
    }
  }

  execute() {
    this.filter();
    this.sort();
    this.pagination();
  }
}

module.exports = ApiFilter;
