'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

test('destinationRoot', () => {
  return helpers
    .run(path.join(__dirname, './app'))
    .withPrompts({ projectName: 'temp' })
    .then(() => {
      assert.equal(path.basename(process.cwd()), 'temp');
    });
});

test('default files', () => {
  return helpers
    .run(path.join(__dirname, './app'))
    .withPrompts({})
    .then(() => {
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

      assert.noFile(['.babelrc', 'src/index.js', 'src/index.test.js']);
      assert.noFile(['.yo-rc.json']);
    });
});

describe('prompts', () => {
  test('projectName', () => {
    return helpers
      .run(path.join(__dirname, './app'))
      .withPrompts({
        projectName: 'foo',
        githubUsername: 'test',
      })
      .then(() => {
        assert.jsonFileContent('package.json', {
          name: 'foo',
          repository: 'https://github.com/test/foo',
        });
        assert.fileContent('readme.md', '# foo');
        assert.fileContent(
          'readme.md',
          '[![Package Version](https://img.shields.io/npm/v/foo.svg)](https://www.npmjs.com/package/foo)'
        );
        assert.fileContent(
          'readme.md',
          '[![Package Version](https://img.shields.io/npm/v/foo.svg)](https://www.npmjs.com/package/foo)\n[![Build Status: Linux](https://img.shields.io/travis/test/foo/master.svg)](https://travis-ci.org/test/foo)\n[![Downloads Status](https://img.shields.io/npm/dm/foo.svg)](https://npm-stat.com/charts.html?package=foo&from=2016-04-01)'
        );
        assert.fileContent('readme.md', 'npm install --save foo');
        assert.fileContent('readme.md', "const foo = require('foo');");
      });
  });

  test('description', () => {
    return helpers
      .run(path.join(__dirname, './app'))
      .withPrompts({ description: 'foo' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          description: 'foo',
        });
        assert.fileContent('readme.md', 'foo');
      });
  });

  test('name', () => {
    return helpers
      .run(path.join(__dirname, './app'))
      .withPrompts({ name: 'foo bar' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          author: {
            name: 'foo bar',
          },
        });
        assert.fileContent('license', 'foo bar');
        assert.fileContent('readme.md', 'MIT &copy; [foo bar]');
      });
  });

  test('email', () => {
    return helpers
      .run(path.join(__dirname, './app'))
      .withPrompts({ email: 'foo@bar.com' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          author: {
            email: 'foo@bar.com',
          },
        });
        assert.fileContent('license', 'foo@bar.com');
      });
  });

  test('website', () => {
    return helpers
      .run(path.join(__dirname, './app'))
      .withPrompts({ website: 'test.com' })
      .then(() => {
        assert.jsonFileContent('package.json', {
          author: {
            url: 'test.com',
          },
        });
        assert.fileContent('readme.md', 'test.com');
      });
  });

  describe('extras', () => {
    test('coverage', () => {
      return helpers
        .run(path.join(__dirname, './app'))
        .withPrompts({
          githubUsername: 'bar',
          projectName: 'foo',
          extras: ['coverage'],
        })
        .then(() => {
          assert.jsonFileContent('package.json', {
            jest: {
              collectCoverage: true,
            },
          });
          assert.fileContent('.travis.yml', 'after_success:');
          assert.fileContent('.travis.yml', 'npm install -g codecov');
          assert.fileContent('.travis.yml', 'codecov');
          assert.fileContent(
            'readme.md',
            '[![Coverage Status](https://img.shields.io/codecov/c/github/bar/foo/master.svg)](https://codecov.io/gh/bar/foo)'
          );
        });
    });

    test('prettier', () => {
      return helpers
        .run(path.join(__dirname, './app'))
        .withPrompts({ extras: ['prettier'] })
        .then(() => {
          assert.fileContent('package.json', 'eslint-config-prettier');
          assert.jsonFileContent('package.json', {
            'lint-staged': {
              '*.js': ['prettier --single-quote --trailing-comma es5 --write'],
            },
            xo: {
              extends: 'prettier',
            },
          });
        });
    });

    test('esnext', () => {
      return helpers
        .run(path.join(__dirname, './app'))
        .withPrompts({
          projectName: 'foo',
          extras: ['esnext'],
        })
        .then(() => {
          assert.file(['.babelrc', 'src/index.js', 'src/index.test.js']);
          assert.noFile(['index.js', 'test.js']);

          assert.fileContent('.gitignore', 'dist');
          assert.fileContent('.travis.yml', 'before_script: npm run build');
          assert.jsonFileContent('package.json', {
            scripts: {
              prebuild: 'rimraf dist',
              build: 'babel src --out-dir dist --copy-files --ignore *.test.js',
            },
            main: 'dist/index.js',
            files: ['dist'],
          });
          assert.fileContent('package.json', 'babel-cli');
          assert.fileContent('package.json', 'babel-jest');
          assert.fileContent('package.json', 'babel-plugin-add-module-exports');
          assert.fileContent('package.json', 'babel-preset-env');
          assert.fileContent('package.json', 'rimraf');

          assert.fileContent('src/index.test.js', "import foo from './';");
          assert.fileContent('src/index.js', 'export default input');
        });
    });

    test('githubTemplates', () => {
      return helpers
        .run(path.join(__dirname, './app'))
        .withPrompts({
          projectName: 'foo',
          email: 'test@test.com',
          githubUsername: 'test',
          extras: ['githubTemplates'],
        })
        .then(() => {
          assert.fileContent('contributing.md', 'https://github.com/test/foo');
          assert.fileContent(
            '.github/issue_template.md',
            /foo version: <!-- run `npm ls foo` -->/
          );
          assert.fileContent(
            '.github/pull_request_template.md',
            'https://github.com/test/foo/blob/master/contributing.md'
          );
          assert.fileContent('other/code_of_conduct.md', 'test@test.com');
        });
    });
  });
});
