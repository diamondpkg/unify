const test = require('ava');
const unify = require('../src');
const sass = require('node-sass');
const fs = require('fs-extra-promise');

test('Sass UBool', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Bool extends unify.FunctionController {
    constructor() {
      super();
      this.arguments = [new unify.Argument('arg')];
    }

    handler(arg) {
      if (!(arg instanceof unify.UBool)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Bool());

  await new Promise(async (resolve) => {
    sass.render({
      data: await fs.readFileAsync('test/sass/bool.scss', 'utf8'),
      outputStyle: 'expanded',
      importer: plugin.toSass().importers,
      functions: plugin.toSass().functions,
    }, async (err, result) => {
      if (err) throw err;

      await fs.writeFileAsync('test/sass/bool.css', result.css);

      if (result.css.toString() !== await fs.readFileAsync('test/sass/bool.css', 'utf8')) t.fail('Generated CSS does not match');

      t.pass();
      resolve();
    });
  });
});

test('Sass UColor', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Color extends unify.FunctionController {
    constructor() {
      super();
      this.arguments = [new unify.Argument('arg')];
    }

    handler(arg) {
      if (!(arg instanceof unify.UColor)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Color());

  await new Promise(async (resolve) => {
    sass.render({
      data: await fs.readFileAsync('test/sass/color.scss', 'utf8'),
      outputStyle: 'expanded',
      importer: plugin.toSass().importers,
      functions: plugin.toSass().functions,
    }, async (err, result) => {
      if (err) throw err;

      await fs.writeFileAsync('test/sass/color.css', result.css);

      if (result.css.toString() !== await fs.readFileAsync('test/sass/color.css', 'utf8')) t.fail('Generated CSS does not match');

      t.pass();
      resolve();
    });
  });
});

test('Sass UNull', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Null extends unify.FunctionController {
    constructor() {
      super();
      this.arguments = [new unify.Argument('arg')];
    }

    handler(arg) {
      if (!(arg instanceof unify.UNull)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Null());

  await new Promise(async (resolve) => {
    sass.render({
      data: await fs.readFileAsync('test/sass/null.scss', 'utf8'),
      outputStyle: 'expanded',
      importer: plugin.toSass().importers,
      functions: plugin.toSass().functions,
    }, async (err, result) => {
      if (err) throw err;

      await fs.writeFileAsync('test/sass/null.css', result.css);

      if (result.css.toString() !== await fs.readFileAsync('test/sass/null.css', 'utf8')) t.fail('Generated CSS does not match');

      t.pass();
      resolve();
    });
  });
});

test('Sass UNumber', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Num extends unify.FunctionController {
    constructor() {
      super();
      this.arguments = [new unify.Argument('arg')];
    }

    handler(arg) {
      if (!(arg instanceof unify.UNumber)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Num());

  await new Promise(async (resolve) => {
    sass.render({
      data: await fs.readFileAsync('test/sass/number.scss', 'utf8'),
      outputStyle: 'expanded',
      importer: plugin.toSass().importers,
      functions: plugin.toSass().functions,
    }, async (err, result) => {
      if (err) throw err;

      await fs.writeFileAsync('test/sass/number.css', result.css);

      if (result.css.toString() !== await fs.readFileAsync('test/sass/number.css', 'utf8')) t.fail('Generated CSS does not match');

      t.pass();
      resolve();
    });
  });
});

test('Sass UString', async (t) => {
  t.plan(1);

  const plugin = new unify.PluginManager();

  class Str extends unify.FunctionController {
    constructor() {
      super();
      this.arguments = [new unify.Argument('arg')];
    }

    handler(arg) {
      if (!(arg instanceof unify.UString)) t.fail('Type mismatch');
      return arg;
    }
  }

  plugin.add(new Str());

  await new Promise(async (resolve) => {
    sass.render({
      data: await fs.readFileAsync('test/sass/string.scss', 'utf8'),
      outputStyle: 'expanded',
      importer: plugin.toSass().importers,
      functions: plugin.toSass().functions,
    }, async (err, result) => {
      if (err) throw err;

      await fs.writeFileAsync('test/sass/string.css', result.css);

      if (result.css.toString() !== await fs.readFileAsync('test/sass/string.css', 'utf8')) t.fail('Generated CSS does not match');

      t.pass();
      resolve();
    });
  });
});
