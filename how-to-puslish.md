# How to publish to GitHub NPM registry?

## 1. Make sure to run `lerna bootstrap`

## 2. Configure the Github registry.

- Create the `.npmrc` file in project root
- Add following config to it.

          registry=https://npm.pkg.github.com
          //npm.pkg.github.com/:_authToken=<TOKEN>

  > `yarn` don't [support](https://github.com/yarnpkg/yarn/issues/4732) scoped registries when it's comes to publishing.
  > Therefore if you needs to install dependencies from public yarn registry,just remove the `registry` config and install public dependencies.

* Replace the `<TOKEN>` with your github personal access token (`PAT`) [generated from your Github account](https://github.com/settings/tokens)

## 3. Run `lerna publish`

- This will build the packages and push them to the configured github NPM registry.

# How to install packages from GitHub NPM registry ?

## 1.Add `.npmrc` file to the project

- Add following config to it.

      @surge-global-engineering:registry=https://npm.pkg.github.com
      //npm.pkg.github.com/:\_authToken=<TOKEN>

- Then install packages : `yarn add @surge-global-engineering/rpdf-renderer`
