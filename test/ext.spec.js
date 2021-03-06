import chai from 'chai';

import compareVectors from './compareVectors';

import { jday } from '../src/ext';
import twoline2satrec from '../src/io';
import { propagate, gstime } from '../src/propagation';

chai.should();

describe('Julian date / time', () => {
  it('jday gives the same result with different arguments describing the same time', () => {
    const now = new Date();
    jday(now).should.equal(jday(
      now.getUTCFullYear(),
      now.getUTCMonth() + 1,
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
    ));
  });

  it('gstime gives the same result with different arguments describing the same time', () => {
    const now = new Date();
    gstime(now).should.equal(gstime(
      now.getUTCFullYear(),
      now.getUTCMonth() + 1,
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
    ));
  });

  it('propagation gives the same result with different arguments describing the same time', () => {
    const date = new Date(2016, 7, 22);
    const tleLine1 = '1 27424U 02022A   16235.86686911  .00000105  00000-0  33296-4 0  9990';
    const tleLine2 = '2 27424  98.2022 175.3843 0001285  39.9183  23.2024 14.57119903760831';
    const satrec = twoline2satrec(tleLine1, tleLine2);

    const propagationByDate = propagate(satrec, date);
    const propagationByDateItems = propagate(
      satrec,
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );

    compareVectors(propagationByDate.position, propagationByDateItems.position);
    compareVectors(propagationByDate.velocity, propagationByDateItems.velocity);
  });
});
