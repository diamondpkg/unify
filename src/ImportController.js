const path = require('path');

/**
 * An importer. You should **extend** this class to make your own ImportController.
 * @class ImportController
 */
module.exports = class ImportController {
  /**
   * @ignore
   */
  constructor() {
    /**
      Whether or not this importer supports Sass.

      @name ImportController#sass
      @type bool
      @default true
    */
    this.sass = true;

    /**
      Whether or not this importer supports Less.

      @name ImportController#less
      @type bool
      @default true
    */
    this.less = true;
    this.stylus = true;
  }

  /**
   * Whether or not the ImportController supports handling importing the specified file.
   *
   * @function ImportController#supports
   * @param {string} filename - The name of the file attempting to be imported.
   * @return {bool} Whether or not the ImportController can import this file.
   */
  supports() {
    return true;
  }

 /**
   * Resolve a import name to a filename.
   *
   * @function ImportController#handler
   * @param {string} lang - The CSS preprocessor, either "sass" or "less".
   * @param {string} filename - The name of the file to be imported.
   * @return {Promise<string>|string} A location of a file on disk.
   */

  toSass() {
    return (filename, currentFile, done) => { // eslint-disable-line
      if (!this.supports(filename)) return null;

      Promise.resolve(this.handler('sass', filename, path.parse(currentFile).dir))
        .then((p) => {
          done({ file: p });
        })
        .catch((err) => {
          done(err);
        });
    };
  }

  toLess(less) {
    const controller = this;
    return class Importer extends less.FileManager {
      supports(filename) {
        return controller.supports(filename);
      }

      loadFile(filename, rd, options, environment) {
        return new Promise((resolve, reject) => {
          let cd;
          if (path.isAbsolute(rd)) cd = rd;
          else cd = path.join(process.cwd(), rd);
          Promise.resolve(controller.handler('less', filename, cd))
            .then((p) => {
              resolve(super.loadFile(p, rd, options, environment));
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    };
  }
};
