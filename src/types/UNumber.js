const stylus = require('stylus');
const sass = require('node-sass');

module.exports = class UNumber {
  constructor(obj, unit, less) {
    this.type = 'number';
    if (obj.constructor.name === 'SassNumber') {
      this.value = obj.getValue();
      this.unit = obj.getUnit();
    } else if (obj instanceof stylus.nodes.Unit) {
      this.value = obj.val;
      this.unit = obj.type || '';
    } else if (less && obj instanceof less.tree.Dimension) {
      this.value = obj.value;
      this.unit = obj.unit.numerator[0] || '';
    } else if (typeof obj === 'number' && typeof unit === 'string') {
      this.value = obj;
      this.unit = unit;
    } else {
      throw new Error(`unrecognized type: expected number (or string for unit), got ${typeof obj}`);
    }
  }

  toSass() {
    return new sass.types.Number(this.value, this.unit);
  }

  toStylus() {
    return new stylus.nodes.Unit(this.value, this.unit);
  }

  toLess(less) {
    return new less.tree.Dimension(this.value, this.unit);
  }
};
