'use strict';

const types = require('./types');

/**
 * An importer. You should **extend** this class to make your own FunctionController.
 * @class FunctionController
 */
module.exports = class FunctionController {
  /**
   * @ignore
   */
  constructor() {
    this.name = this.constructor.name.charAt(0).toLowerCase() + this.constructor.name.slice(1);

    /**
     * All arguments for the function in the order they are used in.
     *
     * @name FunctionController#arguments
     * @type Array<Argument>
     * @default []
     */
    this.arguments = [];

    /**
      Whether or not this function supports Sass.

      @name FunctionController#sass
      @type bool
      @default true
    */
    this.sass = true;

    /**
      Whether or not this function supports Less.

      @name FunctionController#less
      @type bool
      @default true
    */
    this.less = true;

    this.stylus = true;
  }

  /**
   * The function to be called.
   *
   * @function FunctionController#handler
   * @param {...UBool|UColor|UNull|UNumber|UString|UList} args -
   * All arguments passed into the function.
   * @return {UBool|UColor|UNull|UNumber|UString|UList} The return value for the function.
   */

  toSass() {
    const functionArgs = [];
    for (const arg of this.arguments) {
      functionArgs.push(`$${arg.name}`);
    }

    const functionStr = `${this.name}(${functionArgs.join(', ')})`;

    const self = this;

    return {
      [functionStr]() {
        const args = [];
        for (const arg of arguments) {
          if (arg.constructor.name === 'SassList') {
            for (let i = 0; i < arg.getLength(); i += 1) {
              args.push(types.get(arg.getValue(i)));
            }
          } else args.push(types.get(arg));
        }

        return self.handler.apply(null, args).toSass();
      },
    };
  }

  toStylus(stylus) {
    const self = this;
    stylus.define(this.name, function () {
      const args = [];
      for (const arg of arguments) {
        args.push(types.get(arg));
      }

      return self.handler.apply(null, args).toStylus();
    });
  }

  toLess(less) {
    const self = this;
    less.functions.functionRegistry.add(this.name, function () {
      const args = [];
      for (const arg of arguments) {
        args.push(types.get(arg, less));
      }

      return self.handler.apply(null, args).toLess(less);
    });
  }
};
