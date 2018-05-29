# Usage
1. `yarn`
1. `webpack --progress --mode production`
1. `rollup -c`

# Actual Result

## Webpack
`dist/bundle-webpack.js`

Fast build, tree-shaken (into `dist/bundle-webpack.js`)

We know the tree has been shaken because we don't find any icons in the bundle other than `bell`, `coffee`, and `font-awesome`.
We can see those in the bundle by text searching for:
* iconName:'coffee'
* iconName:'bell'
* iconName:'font-awesome'

We do _not_ find other icons in the icon packs, such as 'beer'.

## Rollup
`dist/bundle-rollup.js`

Fast build time, but NOT tree-shaken

# Expected Results

## Webpack

Same as Actual Result.

## Rollup

The output bundle should be tree-shaken but is not.

We know this because we can find icons in the bundle other than `bell`, `coffee`, and `font-awesome`.
By searching for text such as:
* iconName:'beer'

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library, just to make use of the icon objects in some way. And then prints a `hello, world` message. So, the function of the program is trivial, only meant to exercise the build time tree-shaking functionality.

The initial goal of this repo was to demonstrate tree shaking with Webpack 4. That is, to show that when importing and using only a subset of icons, a production-optimized bundle will include only that subset and not the entire icon pack.
