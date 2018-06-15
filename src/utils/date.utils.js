'use strict';

const moment = require('moment-timezone');

function getEightLimit (date) {
  // date: timestamp in milliseconds

  const eightLimit = moment.tz(date, 'Europe/Paris')
    .startOf('day')
    .add({ hours: 8, minutes: 8 });

  if (moment(date).isBefore(eightLimit)) {
    return eightLimit.subtract(1, 'days').valueOf();
  }

  // returns a timestamp in milliseconds
  return eightLimit.valueOf();
}

module.exports = {
  getEightLimit,
};
