'use strict';

const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const findUp = require('find-up');
const pify = require('pify');

let generator;

beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'));
  generator = helpers.createGenerator('node-oss:app', ['../app'], null, {
    skipInstall: true,
  });
});

it('creates and uses the folder for the project', async () => {
  helpers.mockPrompt(generator, {
    projectName: 'test',
  });

  await pify(generator.run.bind(generator))();

  expect(generator.destinationRoot()).toBe(findUp.sync('test'));
});

it('generates default files', async () => {
  helpers.mockPrompt(generator, {});

  await pify(generator.run.bind(generator))();

  assert.file([
    '.git',
    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    '.travis.yml',
    'index.js',
    'license',
    'package.json',
    'readme.md',
    'test.js',
  ]);

  assert.noFile(['.babelrc', 'src/index.js', 'src/__tests__/index.test.js']);
  assert.noFile(findUp.sync('.yo-rc.json'));
});

describe('prompts', () => {
  test('projectName', async () => {
    helpers.mockPrompt(generator, {
      projectName: 'foo',
      githubUsername: 'test',
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"name": "foo"/);
    assert.fileContent('package.json', 'https://github.com/test/foo');
    assert.fileContent('readme.md', /# foo/);
    assert.fileContent(
      'readme.md',
      '[![npm](https://img.shields.io/npm/v/foo.svg?style=flat-square)](https://www.npmjs.com/package/foo)\n[![Travis branch](https://img.shields.io/travis/test/foo/master.svg?style=flat-square)](https://travis-ci.org/test/foo)\n[![npm](https://img.shields.io/npm/dm/foo.svg?style=flat-square)](https://npm-stat.com/charts.html?package=foo&from=2016-04-01)'
    );
    assert.fileContent('readme.md', /npm install --save foo/);
    assert.fileContent('readme.md', "const foo = require('foo');");
  });

  test('description', async () => {
    helpers.mockPrompt(generator, {
      description: 'foo',
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"description": "foo"/);
    assert.fileContent('readme.md', /foo/);
  });

  test('name', async () => {
    helpers.mockPrompt(generator, {
      name: 'foo bar',
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"name": "foo bar"/);
    assert.fileContent('license', /foo bar/);
    assert.fileContent('readme.md', 'MIT &copy; [foo bar]');
  });

  test('email', async () => {
    helpers.mockPrompt(generator, {
      email: 'test@test.com',
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"email": "test@test.com"/);
    assert.fileContent('license', /test@test.com/);
  });

  test('website', async () => {
    helpers.mockPrompt(generator, {
      website: 'test.com',
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"url": "test.com"/);
    assert.fileContent('readme.md', 'test.com');
  });

  describe('extras', () => {
    test('esnext', async () => {
      helpers.mockPrompt(generator, {
        extras: ['esnext'],
      });

      await pify(generator.run.bind(generator))();

      assert.file(['.babelrc', 'src/index.js', 'src/index.test.js']);
      assert.noFile(['index.js', 'test.js']);

      assert.fileContent('.gitignore', /dist/);
      assert.fileContent('package.json', /"prebuild":/);
      assert.fileContent('package.json', /"build":/);
      assert.fileContent('package.json', /"main":/);
      assert.fileContent('package.json', /["dist"]/);
      assert.fileContent('package.json', /"babel-cli"/);
      assert.fileContent('package.json', /"babel-plugin-add-module-exports"/);
      assert.fileContent('package.json', /"babel-preset-env"/);
      assert.fileContent('package.json', /"rimraf"/);
      assert.fileContent('package.json', 'src/**/*.js');
      assert.fileContent('src/index.test.js', "import temp from './';");
      assert.fileContent('.travis.yml', /before_script: npm run build/);
      assert.fileContent('src/index.js', /export default input/);
      assert.fileContent('readme.md', /import temp from 'temp';/);
    });

    test('coverage', async () => {
      helpers.mockPrompt(generator, {
        extras: ['coverage'],
        githubUsername: 'test',
      });

      await pify(generator.run.bind(generator))();

      assert.fileContent('package.json', /"collectCoverage": true/);
      assert.fileContent('.travis.yml', /after_success:/);
      assert.fileContent('.travis.yml', /npm install -g codecov/);
      assert.fileContent('.travis.yml', /codecov/);
      assert.fileContent(
        'readme.md',
        '[![Codecov branch](https://img.shields.io/codecov/c/github/test/temp/master.svg?style=flat-square)](https://codecov.io/gh/test/temp)'
      );
    });

    test('prettier', async () => {
      helpers.mockPrompt(generator, {
        extras: ['prettier'],
      });

      await pify(generator.run.bind(generator))();

      assert.fileContent('package.json', /"eslint-config-prettier"/);
      assert.fileContent('package.json', /"prettier"/);
      assert.fileContent('package.json', /"extends": "prettier"/);
    });

    test('githubTemplates', async () => {
      helpers.mockPrompt(generator, {
        projectName: 'foo',
        email: 'test@test.com',
        githubUsername: 'test',
        extras: ['githubTemplates'],
      });

      await pify(generator.run.bind(generator))();

      assert.fileContent('contributing.md', 'https://github.com/test/foo');
      assert.fileContent(
        '.github/issue_template.md',
        /foo version: <!-- run `npm ls foo` -->/
      );
      assert.fileContent(
        '.github/pull_request_template.md',
        'https://github.com/test/foo/blob/master/contributing.md'
      );
      assert.fileContent('other/code_of_conduct.md', /test@test.com/);
    });
  });
});
