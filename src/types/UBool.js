const stylus = require('stylus');
const sass = require('node-sass');

module.exports = class UBool {
  constructor(obj, less) {
    this.type = 'bool';
    if (obj.constructor.name === 'SassBoolean') {
      this.value = obj.getValue();
    } else if (obj instanceof stylus.nodes.Boolean) {
      this.value = obj.val;
    } else if (less && obj instanceof less.tree.Keyword) {
      this.value = obj.value === 'true';
    } else if (typeof obj === 'boolean') {
      this.value = obj;
    } else {
      throw new Error(`unrecognized type: expected boolean, got ${typeof obj}`);
    }
  }

  toSass() {
    return this.value ? sass.types.Boolean.TRUE : sass.types.Boolean.FALSE;
  }

  toStylus() {
    return new stylus.nodes.Boolean(this.value);
  }

  toLess(less) {
    return new less.tree.Keyword(this.value.toString());
  }
};
