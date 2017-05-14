const stylus = require('stylus');
const sass = require('node-sass');

module.exports = class UString {
  constructor(obj, less) {
    this.type = 'string';
    if (obj.constructor.name === 'SassString') {
      this.value = obj.getValue();
    } else if (obj instanceof stylus.nodes.String) {
      this.value = obj.val;
    } else if (less && obj instanceof less.tree.Quoted) {
      this.value = obj.value;
    } else if (typeof obj === 'string') {
      this.value = obj;
    } else {
      throw new Error(`unrecognized type: expected string, got ${typeof obj}`);
    }
  }

  toSass() {
    return new sass.types.String(this.value);
  }

  toStylus() {
    return new stylus.nodes.String(this.value);
  }

  toLess(less) {
    return new less.tree.Quoted('"', this.value, false);
  }
};
