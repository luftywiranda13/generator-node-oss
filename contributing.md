# Contributing

Contributions are always welcome, no matter how large or small.

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Code of Conduct

By participating, you are expected to uphold this [Contributor Covenant Code of Conduct](./other/code_of_conduct.md). Please report unacceptable behavior to [lufty.wiranda@gmail.com](mailto:lufty.wiranda@gmail.com).

## Project setup

First, fork then clone the repo:

```sh
git clone https://github.com/your-username/generator-node-oss
cd generator-node-oss
git remote add upstream https://github.com/luftywiranda13/generator-node-oss
git branch --set-upstream-to=upstream/master master
```

Install dependencies:

```sh
npm install
```

Run test suits to validate the project is working:

```sh
npm test
```

## Committing and Pushing changes

> This project uses [semantic-release](https://npmjs.com/package/semantic-release) to do automatic releases and generate a changelog based on the
commit history. So we follow [a convention](https://github.com/conventional-changelog/conventional-changelog-angular/blob/ed32559941719a130bb0327f886d6a32a8cbc2ba/convention.md) for commit messages.

> You don‘t have to follow the convention if you don‘t like to. Just know that when we merge your commit, we‘ll probably use “Squash and Merge” so we can change the commit message.

Create a branch and start hacking:

```sh
git checkout -b my-branch
```

Commit and push your changes:

```sh
git add my/changed/files
git commit
git push origin my-branch
```

Open this project on [GitHub](https://github.com/luftywiranda13/generator-node-oss), then click “Compare & pull request”.

## Add yourself as a contributor

> This project follows the [all contributors](https://github.com/kentcdodds/all-contributors) specification. To add yourself to the table of
contributors on the [`readme.md`](./readme.md), please use the automated script as part of your PR:

```sh
npm run contributors:add
```

> Follow the prompt. If you‘ve already added yourself to the list and are making a
new type of contribution, you can run it again and select the added contribution
type.

## Help needed

Please checkout the [`roadmap.md`](./other/roadmap.md) and the open issues.

Also, please watch the repo and respond to questions/bug reports/feature requests, Thanks!
