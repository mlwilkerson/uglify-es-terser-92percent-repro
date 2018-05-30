# Description

Initially, this repo was dedicated to reproducing the notorious "92% asset chunk asset optimization" hang issue in Webpack 4 with UglifyJS and exploring alternatives.

However, it has been evolving into a side-by-side comparison of Webpack and Rollup in a variety of tree-shaking scenarios, seeking workarounds and alternative approaches to module packaging that achieves the best results for both bundlers at the same time.

We are operating on the icon packages in Font Awesome 5 Free, which seem to be ideal candidates for such tree-shaking tests, since each package simply includes _lots_ of JavaScript objects, each representing an SVG icon. It's clear to tell when tree-shaking works or doesn't, and when the build is fast or isn't, since there's a significant real-world scale to the size of these modules.

This repo contains several branches, each exploring a different scenario. Some branches only demonstrate Webpack; most compare Webpack to Rollup.

See the `README.md` on each branch for more details and usage of each scenario.

# Usage
1. `yarn`
1. `webpack --progress --mode production`
1. `rollup -c`

# Actual Result

## Webpack
`dist/bundle-webpack.js`

During the build process, observe it hanging here for a really long time, like `274238ms` on a 3.1 GHz Intel Core i7 with 16 GB RAM.
```
92% chunk asset optimization UglifyJSPlugin
```

## Rollup
`dist/bundle-rollup.js`

Fast build time, tree-shaken

# Expected Result
It should build in 3-4 seconds at most, resulting in a tree-shaken `dist/bundle-webpack.js` and `dist/bundle-rollup.js`
We'll know the tree has been shaken because we won't find any icons in the bundle other than `bell`, `coffee`, and `font-awesome`.
We can see those in the bundle by text searching for:
* iconName:'coffee'
* iconName:'bell'
* iconName:'font-awesome'

We should _not_ be able to find other icons in the icon packs, such as 'beer'.

# Alternate Scenarios

There are other branches in this repo with alternate scenarios: workarounds and such.

1. `uglify-js-no-compress`: adds `compress: false` to `uglifyOptions` in `webpack.config.js`. Not a satisfactory workaround.
1. `babel-minify`: uses `babel-minify-webpack-plugin` instead of the default config that uses UglifyJS. This scenario works as expected: fast build, with proper tree-shaking.
1. `webpack-3.8.1`: uses webpack 3.8.1 and mostly-default configuration to achieve a production build, instead of webpack 4. Works as expected: fast build, with proper tree-shaking.
1. `re-exports-trial`: packaging icon `index.es.js` modules as importing and exporting individual icon submodules AND setting `sideEffects: false`. Compare Rollup to Webpack 4.
1. `side-effects-false-only`: setting `sideEffects: false` without otherwise changing the _contents_ of the `index.es.js` or submodule files.

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library, just to make use of the icon objects in some way. And then prints a `hello, world` message. So, the function of the program is trivial, only meant to exercise the build time tree-shaking functionality.

The initial goal of this repo was to demonstrate tree shaking with Webpack 4. That is, to show that when importing and using only a subset of icons, a production-optimized bundle will include only that subset and not the entire icon pack.
