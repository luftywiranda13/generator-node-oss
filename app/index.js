'use strict';

const path = require('path');

const Generator = require('yeoman-generator');
const camelCase = require('lodash.camelcase');
const kebabCase = require('lodash.kebabcase');
const findUp = require('find-up');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return this.prompt([
      {
        name: 'projectName',
        message: 'Project name',
        default: this.appname
      },
      {
        name: 'description',
        message: 'Description',
        default: 'as cute as bunny',
        store: true
      },
      {
        name: 'esnext',
        message: 'Need ES2015+',
        type: 'confirm',
        default: false
      },
      {
        name: 'coverage',
        message: 'Need code coverage',
        type: 'confirm',
        default: false
      },
      {
        name: 'name',
        message: 'Author\'s name',
        default: this.user.git.name()
      },
      {
        name: 'email',
        message: 'Author\'s email',
        default: this.user.git.email()
      },
      {
        name: 'website',
        message: 'Author\'s website',
        store: true
      },
      {
        name: 'githubUsername',
        message: 'GitHub username',
        store: true
      }
    ]).then(answers => {
      this.props = {
        projectName: kebabCase(answers.projectName),
        camelProject: camelCase(answers.projectName),
        description: answers.description,
        esnext: answers.esnext,
        coverage: answers.coverage,
        name: answers.name,
        email: answers.email,
        website: answers.website,
        githubUsername: answers.githubUsername
      };
    });
  }

  configuring() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }

  default() {
    this.spawnCommandSync('git', ['init'], {stdio: false});
  }

  writing() {
    this.fs.copyTpl(
      [`${this.templatePath()}/**`, '!**/_babelrc'],
      this.destinationPath(),
      this.props
    );

    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };

    mv('_editorconfig', '.editorconfig');
    mv('_gitattributes', '.gitattributes');
    mv('_github/issue_template.md', '.github/issue_template.md');
    mv('_github/pull_request_template.md', '.github/pull_request_template.md');
    mv('_gitignore', '.gitignore');
    mv('_package.json', 'package.json');
    mv('_test.js', 'test.js');
    mv('_travis.yml', '.travis.yml');

    if (this.props.esnext) {
      mv('index.js', 'src/index.js');
      mv('test.js', 'src/index.test.js');
      this.fs.copy(
        this.templatePath('_babelrc'),
        this.destinationPath('.babelrc')
      );
    }
  }
  install() {
    this.installDependencies({bower: false});
  }
  end() {
    this.fs.delete(findUp.sync('.yo-rc.json'));
  }
};
