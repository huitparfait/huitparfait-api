'use strict';
/* eslint-env jest */

const dateUtils = require('./date.utils');
const moment = require('moment-timezone');

describe('getEightLimit()', () => {

  test('Given now is before 8:08 in Paris', () => {

    const timeZone = 'Europe/Paris';
    const before808 = moment.tz('2018-06-15 08:07', timeZone).valueOf();

    const eightLimit = dateUtils.getEightLimit(before808);

    expect(eightLimit).toEqual(moment.tz('2018-06-14 08:08', timeZone).valueOf());
  });

  test('Given now is after 8:08 in Paris', () => {

    const timeZone = 'Europe/Paris';
    const after808 = moment.tz('2018-06-15 08:09', timeZone).valueOf();

    const eightLimit = dateUtils.getEightLimit(after808);

    expect(eightLimit).toEqual(moment.tz('2018-06-15 08:08', timeZone).valueOf());
  });

  test('Given now is before 8:08 in Reykjavik', () => {

    const timeZone = 'Atlantic/Reykjavik';
    const before808 = moment.tz('2018-06-15 06:07', timeZone).valueOf();

    const eightLimit = dateUtils.getEightLimit(before808);

    expect(eightLimit).toEqual(moment.tz('2018-06-14 06:08', timeZone).valueOf());
  });

  test('Given now is after 8:08 in Reykjavik', () => {

    const timeZone = 'Atlantic/Reykjavik';
    const after808 = moment.tz('2018-06-15 06:09', timeZone).valueOf();

    const eightLimit = dateUtils.getEightLimit(after808);

    expect(eightLimit).toEqual(moment.tz('2018-06-15 06:08', timeZone).valueOf());
  });

});
