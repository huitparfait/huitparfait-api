'use strict';

// Hack bug in identicon.js while we wait for this:
// https://github.com/stewartlord/identicon.js/pull/46/files/7b2ca6ec0c1e3664ba20388e7ad9f0a69615cd34
global.btoa = null;
const Identicon = require('identicon.js');

function addIdenticon (item) {
  if (item.avatarUrl != null) {
    return item;
  }
  const options = { brightness: 0, format: 'svg' };
  const data = new Identicon(item.id, options).toString();
  const dataUri = `data:image/svg+xml;base64,${data}`;
  return { ...item, avatarUrl: dataUri };
}

module.exports = {
  addIdenticon,
};
