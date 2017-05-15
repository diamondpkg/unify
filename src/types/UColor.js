'use strict';

const stylus = require('stylus');
const sass = require('node-sass');
const Color = require('color');

module.exports = class UColor {
  constructor(r, g, b, a, less) {
    this.type = 'color';
    if (r.constructor.name === 'SassColor') {
      this.value = [r.getR(), r.getG(), r.getB(), r.getA()];
    } else if (r instanceof stylus.nodes.RGBA) {
      this.value = [r.r, r.g, r.b, r.a];
    } else if (r instanceof stylus.nodes.HSLA) {
      const col = Color.hsl([r.h, r.s, r.l, r.a]).rgb();
      this.value = col.color;
      this.value[3] = col.valpha;
    } else if (less && r instanceof less.tree.Color) {
      this.value = r.rgb;
      this.value[3] = r.alpha;
    } else {
      if (!(typeof r === 'number' && typeof g === 'number' &&
      typeof b === 'number' && (a === undefined || typeof a === 'number'))) {
        throw new Error('all params in UColor must be numbers');
      }
      this.value = [r, g, b, a || 1];
    }
  }

  toSass() {
    return new sass.types.Color(this.value[0], this.value[1], this.value[2], this.value[3]);
  }

  toStylus() {
    return new stylus.nodes.RGBA(this.value[0], this.value[1], this.value[2], this.value[3]);
  }

  toLess(less) {
    return new less.tree.Color([this.value[0], this.value[1], this.value[2]], this.value[3]);
  }
};
