'use strict';

const slugify = require('slug');

function addSlug (group) {
  const slug = slugify(group.name, {lower: true});
  return { ...group, slug };
}

module.exports = {
  addSlug,
};
