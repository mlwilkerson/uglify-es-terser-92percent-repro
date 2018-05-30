# Scenario

1. Use icon packages like `@fortawesome/free-solid-svg-icons` which have no side effects
1. Use `sideEffects: false` in their package.json files
1. Their `index.es.js` files define and export JS objects
1. Disable minification in order to show what the bundlers are doing with regard to tree-shaking apart from or prior to any minification process

# Usage
1. `yarn`
1. `webpack --progress --mode production`
1. `rollup -c`

# Actual Result

## Webpack
`dist/bundle-webpack.js`

Fast build time, NOT tree-shaken

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
