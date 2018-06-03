'use strict';

const exec = require('child_process').exec;


function reset() {

  return new Promise((resolve, reject) => {
    exec('npm run db:reset', null,
      (err, stdout, stderr) => {
        err ? reject(err) : resolve({
          stdout: stdout,
          stderr: stderr,
        });
      });
  });
}

module.exports = {
  reset,
};
