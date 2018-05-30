# Scenario

This scenario is identical to `master`, except that the `package.json` files of the icon packages
include `sideEffects: false`. The contents of the `index.es.js` and submodule files are the same
as `master`, though. This makes it different from the `re-exports-trial` branch, in which the
both `sideEffects: false` is applied, AND the `index.es.js` files handle icon definition, import
and re-export differently.

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

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library, just to make use of the icon objects in some way. And then prints a `hello, world` message. So, the function of the program is trivial, only meant to exercise the build time tree-shaking functionality.

The initial goal of this repo was to demonstrate tree shaking with Webpack 4. That is, to show that when importing and using only a subset of icons, a production-optimized bundle will include only that subset and not the entire icon pack.
