const test = require('ava');
const unify = require('../src');
const stylus = require('stylus');
const fs = require('fs-extra-promise');

test('Stylus UBool', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Bool extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UBool)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Bool());

  await new Promise(async (resolve) => {
    stylus(await fs.readFileAsync('test/styl/bool.styl', 'utf8'))
      .use(plugin.stylus)
      .render(async (err, css) => {
        if (err) throw err;

        if (css !== await fs.readFileAsync('test/styl/bool.css', 'utf8')) t.fail('Generated CSS does not match');

        t.pass();
        resolve();
      });
  });
});

test('Stylus UColor', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Color extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UColor)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Color());

  await new Promise(async (resolve) => {
    stylus(await fs.readFileAsync('test/styl/color.styl', 'utf8'))
      .use(plugin.stylus)
      .render(async (err, css) => {
        if (err) throw err;

        if (css !== await fs.readFileAsync('test/styl/color.css', 'utf8')) t.fail('Generated CSS does not match');

        t.pass();
        resolve();
      });
  });
});

test('Stylus UNull', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Null extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UNull)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Null());

  await new Promise(async (resolve) => {
    stylus(await fs.readFileAsync('test/styl/null.styl', 'utf8'))
      .use(plugin.stylus)
      .render(async (err, css) => {
        if (err) throw err;

        if (css !== await fs.readFileAsync('test/styl/null.css', 'utf8')) t.fail('Generated CSS does not match');

        t.pass();
        resolve();
      });
  });
});

test('Stylus UNumber', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Num extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UNumber)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Num());

  await new Promise(async (resolve) => {
    stylus(await fs.readFileAsync('test/styl/number.styl', 'utf8'))
      .use(plugin.stylus)
      .render(async (err, css) => {
        if (err) throw err;

        if (css !== await fs.readFileAsync('test/styl/number.css', 'utf8')) t.fail('Generated CSS does not match');

        t.pass();
        resolve();
      });
  });
});

test('Stylus UString', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Str extends unify.FunctionController {
    handler(arg) {
      if (!(arg instanceof unify.UString)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Str());

  await new Promise(async (resolve) => {
    stylus(await fs.readFileAsync('test/styl/string.styl', 'utf8'))
      .use(plugin.stylus)
      .render(async (err, css) => {
        if (err) throw err;

        if (css !== await fs.readFileAsync('test/styl/string.css', 'utf8')) t.fail('Generated CSS does not match');

        t.pass();
        resolve();
      });
  });
});
