# Scenario

1. Add ES6 modules with .es.js extensions for each icon, and update the `index.es.js` in each icon pack to import and re-export them.
1. Use `sideEffects: false` in the `package.json` files in each icon package to hint to webpack 4 that these
modules can be tree-shaken.
1. DISABLE minification for webpack to show that tree-shaking is happening at the bundler level, not in a minifier plugin.

# Usage
1. `yarn`
1. `webpack --progress --mode production`
1. `rollup -c`
1. load `dist/display-webpack.html` in a browser to view rendered icons from the webpack bundle.
1. load `dist/display-rollup.html` in a browser to view rendered icons from the rollup bundle.

# Actual Result

## Webpack
`dist/bundle-webpack.js`

Fast build, tree-shaken (into `dist/bundle-webpack.js`)

(Though the webpack bundle is significantly larger than the rollup bundle.)

We know the tree has been shaken because we don't find any icons in the bundle other than `bell`, `coffee`, and `font-awesome`.
We can see those in the bundle by text searching for:
* iconName:'coffee'
* iconName:'bell'
* iconName:'font-awesome'

We do _not_ find other icons in the icon packs, such as 'beer'.

## Rollup
`dist/bundle-rollup.js`

Fast build, tree-shaken (into `dist/bundle-rollup.js`)

# Expected Results

## Webpack

Same as Actual Result.

The key here is that Webpack is (apparently) handling tree-shaking at the bundler level, not at the level of a minification plugin, like uglify.

## Rollup

Same as Actual Result.

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library and starts watching the DOM for icons to render or modify. It displays those three icons that were imported from the icon packs.

