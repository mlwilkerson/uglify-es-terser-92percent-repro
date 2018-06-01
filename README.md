# Description

This repo is dedicated to reproducing the notorious "92% asset chunk asset optimization" hang issue originally experienced with Webpack 4, but caused by the `uglify-es` npm package, which is the default minification plugin used by Webpack 4 for production builds.

Build time and final bundle results are compared with an alternate minifier: `babel-minify`.

# Steps To Reproduce
1. `yarn`
2. `webpack --progress --mode production`

This produces a production bundle without minimization, and therefore not yet tree-shaken, as `dist/bundle.js`

We've configured `webpack.config.js` to disable minification for this reproduction because we want to be able to see a snapshot of what the bundle from webpack 4 would look like before minification. And we want to be sure that the exact same input is used in both of the following steps, where compare running two different minifiers on it: (A) `uglify-es` (the webpack 4 default), and (B) `babel-minify`.

3. `./node_modules/.bin/uglifyjs -V`

Make sure it reports `uglify-es 3.3.9` or compatible, since that's what webpack 4 would be using for minification.

(Yes, it's weird that the command line tool is called `uglifyjs` while the underlying workhorse in this case is `uglify-es`, but no, that's not a typo.)

4. `./node_modules/.bin/uglifyjs --compress --output dist/bundle-uglify-es.js dist/bundle.js`

This will take a _long time_, way too long. It might even seem like it's stuck. But it will probably finish eventually, and produce the correct output (See expected results below).

5. `./node_modules/.bin/babel-minify dist/bundle.js -o dist/bundle-babel-minify.js`

This will run _fast_ and produce correct output.

# Expected Results

Each minifier should complete it's work in 3-4 seconds at most, resulting in a tree-shaken minified bundle.

We'll know the tree has been shaken because we won't find any icons in the bundle other than `bell`, `coffee`, and `font-awesome`.

We can see those in the bundle by text searching for:
* iconName:"coffee"
* iconName:"bell"
* iconName:"font-awesome"

We can also run the bundle, which simply prints the `iconName` property of each imported icon object, like this:
```
$ node ./dist/bundle-babel-minify.js
icons: coffee, bell, font-awesome
```

We should _not_ be able to find other icons in the minified bundles, such as 'beer'. If the tree is not shaken, there will be _many_ other unused icons bloating the bundle—it'll be obvious.

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single JavaScript object (a Font Awesome 5 icon definition) out of each of three icon packs from Font Awesome 5 Free and `console.log()`s the `iconName` property of each imported icon object. The focus of this repro is on the build time.

# Background

Initially, this repo was made to reproduce the notorious "92% asset chunk asset optimization" hang issue in Webpack 4.

It is now more focused on demonstrating that the problem lies with the `uglify-es` minifier. Using a different minifier, such as `babel-minifiy`, on a webpack 4 bundle works. And the `uglify-js` minifier from webpack 3 also worked as expected (See the `webpack-3.12.0` branch of this repo). But the default minifier for webpack 4 is _very_ slow in this scenario.

In Webpack's way of tree-shaking, it is the minifier plugin that is responsible for finally eliminating the dead code, and thus for how long that tree-shaking process takes. [See here.](https://www.emarsys.com/en/resources/blog/tree-shaking-in-webpack-2/):

> Webpack only marks code unused and doesn’t export it inside the module. It pulls in all of the available code and leaves dead code elimination to minification libraries like UglifyJS. UglifyJS gets the bundled code and removes unused functions and variables before minifying.

Thus, it has become apparent that the real source of difference between what worked in Webpack 3 and doesn't work in Webpack 4 is the use of `uglify-js` in the former and `uglify-es` in the latter. Therefore, if an improvement is to be made, it must be made to `uglify-es`.

The maintainance of the `uglify-es` project is shifting ownership. A new fork has recently been created and called [`terser`](https://github.com/fabiosantoscode/terser). So this is presumably where an future fix of this performance problem should be made. Hopefully, Webpack will then shift its dependency to `terser`, away from `uglify-es`.

For this reproduction, we are operating on the icon packages in Font Awesome 5 Free. These seem to be ideal candidates for a tree-shaking test because each package includes _lots_ of separate JavaScript objects, each representing an icon. It's clear when tree-shaking works or doesn't, and when the build is fast or isn't, since there's a significant real-world scale with the size of these modules.

# Alternate Scenarios

Earlier explorations produced multiple branches, attempting various scenarios. See the `README.md` on each branch for more details and usage of each scenario.

1. `uglify-js-no-compress`: adds `compress: false` to `uglifyOptions` in `webpack.config.js`. Not a satisfactory workaround.
1. `babel-minify`: uses `babel-minify-webpack-plugin` instead of the default config that uses UglifyJS. This scenario works as expected: fast build, with proper tree-shaking.
1. `webpack-3.8.1`: uses webpack 3.8.1 and mostly-default configuration to achieve a production build, instead of webpack 4. Works as expected: fast build, with proper tree-shaking.
1. `webpack-3.12.0`: uses webpack 3.12.0. Works as expected: fast build, with proper tree-shaking.
1. `re-exports-trial`: packaging icon `index.es.js` modules as importing and exporting individual icon submodules AND setting `sideEffects: false`. Compare Rollup to Webpack 4.
1. `side-effects-false-only`: setting `sideEffects: false` without otherwise changing the _contents_ of the `index.es.js` or submodule files.
1. `es-submodules`: add `.mjs` (ES6) submodules for each icon and have `index.es.js` import these, also use `sideEffects: false`
1. `es-submodules-es-not-mjs`: like `es-submodules` except we use `.es.js` extensions instead of `.mjs` for the ES submodules.
1. `webpack4-no-minimize-re-export`: demonstrate that webpack 4--_apart and prior to any minification plugin_--can shake the tree when `index.es.js` simply re-exports imported icon objects from submodules.
1. `webpack4-no-minimize`: demonstrate that webpack 4--_apart and prior to any minification plugin_--DOES NOT shake the tree when `index.es.js` _defines_ and exports the icon objects.
