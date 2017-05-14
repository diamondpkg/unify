const types = require('./types');
const PluginManager = require('./PluginManager');
const ImportController = require('./ImportController');
const Argument = require('./Argument');
const FunctionController = require('./FunctionController');

module.exports = {
  PluginManager,
  ImportController,
  Argument,
  FunctionController,
};

Object.assign(module.exports, types);
