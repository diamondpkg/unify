const test = require('ava');
const unify = require('../src');
const less = require('less');
const fs = require('fs-extra-promise');

test('Less UBool', async (t) => {
  const plugin = new unify.PluginManager();

  class Bool extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UBool)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Bool());

  const output = await less.render(await fs.readFileAsync('test/less/bool.less', 'utf8'), { plugins: [plugin.less] });

  if (output.css !== await fs.readFileAsync('test/less/bool.css', 'utf8')) t.fail('Generated CSS does not match');

  t.pass();
});

test('Less UColor', async (t) => {
  const plugin = new unify.PluginManager();

  class Color extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UColor)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Color());

  const output = await less.render(await fs.readFileAsync('test/less/color.less', 'utf8'), { plugins: [plugin.less] });

  if (output.css !== await fs.readFileAsync('test/less/color.css', 'utf8')) t.fail('Generated CSS does not match');

  t.pass();
});

test('Less UNull', async (t) => {
  const plugin = new unify.PluginManager();

  class Null extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UNull)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Null());

  const output = await less.render(await fs.readFileAsync('test/less/null.less', 'utf8'), { plugins: [plugin.less] });

  if (output.css !== await fs.readFileAsync('test/less/null.css', 'utf8')) t.fail('Generated CSS does not match');

  t.pass();
});

test('Less UNumber', async (t) => {
  const plugin = new unify.PluginManager();

  class Num extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UNumber)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Num());

  const output = await less.render(await fs.readFileAsync('test/less/number.less', 'utf8'), { plugins: [plugin.less] });

  if (output.css !== await fs.readFileAsync('test/less/number.css', 'utf8')) t.fail('Generated CSS does not match');

  t.pass();
});

test('Less UString', async (t) => {
  const plugin = new unify.PluginManager();

  class Str extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UString)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Str());

  const output = await less.render(await fs.readFileAsync('test/less/string.less', 'utf8'), { plugins: [plugin.less] });

  if (output.css !== await fs.readFileAsync('test/less/string.css', 'utf8')) t.fail('Generated CSS does not match');

  t.pass();
});
