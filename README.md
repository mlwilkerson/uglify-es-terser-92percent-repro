# Scenario

1. Add ES6 modules with .mjs extensions for each icon, and update the `index.es.js` in each icon pack to import them.
1. Use Webpack 3

# Usage
1. `yarn`
1. `webpack --progress -p`
1. load `dist/display-webpack.html` in a browser to view rendered icons from the webpack bundle.

# Actual Result

## Webpack
`dist/bundle-webpack.js`

Fast-ish build, NOT tree-shaken (into `dist/bundle-webpack.js`)

# Expected Results

Same as Actual Result.

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library and starts watching the DOM for icons to render or modify. It displays those three icons that were imported from the icon packs.

