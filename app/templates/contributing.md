# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Project setup

1.  Fork and clone the repo
2.  `npm install` to install dependencies
3.  `npm test` to validate you‘ve got it working
4.  Create a branch for your PR

> Tip: Keep your `master` branch pointing at the original repository and make pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/<%= githubUsername %>/<%= projectName %>
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a “remote” called “upstream”, Then fetch the git information from that remote, then set your local `master` branch to use the upstream master branch whenever you run `git pull`. Then you can make all of your pull request branches based on this `master` branch. Whenever you want to update your version of `master`, do a regular `git pull`.

## Help needed

Please checkout the [`roadmap.md`](./other/roadmap.md) and the open issues.

Also, please watch the repo and respond to questions/bug reports/feature requests, Thanks!
