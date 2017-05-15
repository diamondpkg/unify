'use strict';

const stylus = require('stylus');
const sass = require('node-sass');

module.exports = class UNull {
  constructor() {
    this.type = 'null';
    this.value = null;
  }

  toSass() {
    return sass.types.Null.NULL;
  }

  toStylus() {
    return new stylus.nodes.Null();
  }

  toLess(less) {
    return new less.tree.Keyword('null');
  }
};
