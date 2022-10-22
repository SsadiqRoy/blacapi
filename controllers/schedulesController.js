const { Op } = require('sequelize');
const { create, deleteOne, update, getAll, getOne } = require('../middlewares/globalMiddleware');
const Schedule = require('../model/schedules');
const { updater } = require('../utils/utils');

//

//

exports.addSchedule = create(Schedule);
exports.updateSchedule = update(Schedule);
exports.deleteSchedule = deleteOne(Schedule);
exports.allSchedules = getAll(Schedule);
exports.oneSchedule = getOne(Schedule);
//

exports.initializeAllSchedules = async function () {
  try {
    const all = await Schedule.findAll({ where: { date: { [Op.lte]: Date.now() } } });

    let n = 0;
    while (n < all.length) {
      updater(async () => {
        const schedule = JSON.parse(JSON.stringify(all[n]));
        await Schedule.update({ updatedAt: Date.now(), user: schedule.user }, { where: { id: schedule.id } });
      });
      n++;
    }
    console.log('all schedules have been initialized');
  } catch (error) {
    console.log(error);
  }
};
