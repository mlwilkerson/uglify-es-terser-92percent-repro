# Scenario

1. Use icon packages like `@fortawesome/free-solid-svg-icons` which have no side effects
1. Their `index.es.js` files have var definitions and exports for each icon as a JS object
1. Configure uglify-es with collapse_vars=false

# Usage
1. `yarn`
1. `webpack --progress --mode production`
1. load `dist/display-webpack.html` in a browser to view rendered icons from the webpack bundle.

# Actual Result

## Webpack
`dist/bundle-webpack.js`

Fast build time, tree-shaken

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library and starts watching the DOM for icons to render or modify. It displays those three icons that were imported from the icon packs.
