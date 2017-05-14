const sass = require('node-sass');
const stylus = require('stylus');
const UString = require('./UString');
const UNumber = require('./UNumber');
const UColor = require('./UColor');
const UBool = require('./UBool');
const UNull = require('./UNull');

class UList { // eslint-disable-line
  constructor(obj) {
    this.type = 'list';
    if (obj.constructor.name === 'SassList') {
      this.value = [];
      for (let i = 0; i < obj.getLength(); i += 1) {
        this.value.push(module.exports.get(obj.getValue(i))); // eslint-disable-line
      }
    } else if (obj instanceof Array) {
      this.value = obj;
      for (const val of obj) {
        if (!(val instanceof UString || val instanceof UNumber ||
        val instanceof UColor || val instanceof UBool ||
        val instanceof UNull || val instanceof UList)) {
          throw new Error('list must be an array of Unify types');
        }
      }
    } else {
      throw new Error(`unrecognized type: expected array, got ${typeof obj}`);
    }
  }

  toSass() {
    const list = new sass.types.List(this.value.length);
    for (const i in this.value) {
      list.setValue(i, this.value[i]);
    }
    return list;
  }
}

module.exports = {
  UString,
  UNumber,
  UColor,
  UBool,
  UNull,
  // UList,

  get(obj, less) {
    if (obj.constructor.name === 'SassString') return new UString(obj);
    else if (obj.constructor.name === 'SassNumber') return new UNumber(obj);
    else if (obj.constructor.name === 'SassColor') return new UColor(obj);
    else if (obj.constructor.name === 'SassBoolean') return new UBool(obj);
    else if (obj.constructor.name === 'SassNull') return new UNull(obj);
    // else if (obj.constructor.name === 'SassList') return new UList(obj);

    else if (obj instanceof stylus.nodes.String) return new UString(obj);
    else if (obj instanceof stylus.nodes.Unit) return new UNumber(obj);
    else if (obj instanceof stylus.nodes.Boolean) return new UBool(obj);
    else if (obj instanceof stylus.nodes.Null) return new UNull(obj);
    else if (obj instanceof stylus.nodes.RGBA) return new UColor(obj);
    else if (obj instanceof stylus.nodes.HSLA) return new UColor(obj);

    else if (less && obj instanceof less.tree.Keyword && (obj.value === 'true' || obj.value === 'false')) return new UBool(obj, less);
    else if (less && obj instanceof less.tree.Keyword && obj.value === 'null') return new UNull(obj, less);
    else if (less && obj instanceof less.tree.Color) return new UColor(obj, undefined, undefined, undefined, less); // eslint-disable-line
    else if (less && obj instanceof less.tree.Quoted) return new UString(obj, less);
    else if (less && obj instanceof less.tree.Dimension) return new UNumber(obj, undefined, less);

    return new UNull(obj);
  },
};
