const path = require('path');
const deasync = require('deasync-promise');
const ImportController = require('./ImportController');
const FunctionController = require('./FunctionController');

/**
 * Manages your plugin.
 * @class PluginManager
 */
module.exports = class PluginManager {
  constructor() {
    this.importControllers = [];
    this.functionControllers = [];
  }

  /**
   * Adds a controller to your plugin.
   * @function PluginManager#add
   * @param {ImportController|FunctionController} instance - The controller to add
   */
  add(instance) {
    if (instance instanceof ImportController) {
      this.importControllers.push(instance);
    } else if (instance instanceof FunctionController) {
      this.functionControllers.push(instance);
    } else {
      throw new Error(`PluginManager#add(): Invalid instance, unrecognized class '${instance.constructor.name}'`);
    }
  }

  toSass() {
    const importers = [];
    for (const importController of this.importControllers) {
      if (importController.sass === true) importers.push(importController.toSass());
    }

    const functions = {};
    for (const functionController of this.functionControllers) {
      if (functionController.sass === true) Object.assign(functions, functionController.toSass());
    }

    return {
      importers,
      functions,
    };
  }

  toStylus() {
    const self = this;

    return (stylus) => {
      for (const functionController of self.functionControllers) {
        if (functionController.stylus === true) functionController.toStylus(stylus);
      }

      stylus.define('import', function (file) {
        return deasync(new Promise((resolve, reject) => {
          if (!(file instanceof stylus.nodes.String)) throw new Error(`expected type string, got type ${file.constructor.name}`);

          let found = false;

          for (const importController of self.importControllers) {
            if (importController.stylus === true && importController.supports(file.val)) {
              found = true;
              let cd;
              if (path.isAbsolute(this.renderer.nodes.filename)) {
                if (this.renderer.nodes.filename.includes('node_modules/stylus/lib/functions/index.styl')) {
                  cd = path.join(process.cwd(), this.filename);
                } else {
                  cd = this.renderer.nodes.filename;
                }
              } else cd = path.parse(path.join(process.cwd(), this.renderer.nodes.filename)).dir;
              Promise.resolve(importController.handler('stylus', file.val, cd))
                .then((str) => {
                  resolve(new stylus.nodes.String(str));
                })
                .catch(reject);
            }
          }

          if (!found) resolve(file);
        }));
      });
    };
  }

  toLess() {
    const self = this;
    return {
      install(less, lessPluginManager) {
        for (const functionController of self.functionControllers) {
          if (functionController.less === true) functionController.toLess(less);
        }

        for (const importController of self.importControllers) {
          if (importController.less !== true) continue;
          lessPluginManager.addFileManager(new (importController.toLess(less))());
        }
      },
    };
  }
};
