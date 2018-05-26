# Scenario

In this alternate scenario, we add some configuration to `webpack.config.js` to disable source maps and tell
`uglify-js` not to compress.

As a result, the build no longer hangs, but it also does not do tree-shaking, which is the ultimate desired result.

# Usage
1. `yarn`
1. `webpack --progress --mode production`

# Actual Result
1. rapid build
1. `dist.bundle.js` includes all icons, rather than just those actually used in `src/index.js`

# Expected Result
The actual result, in this case, _is_ the expected result. But it shows that, in order to fix the build-time,
you have to disable the key feature that we wanted to use. Thus, `compress: false` is not an acceptible workaround.

# Explanation of the Code being Compiled

`src/index.js` contains code that simply imports a single icon out of each of three icon packs from Font Awesome 5 Free, where each icon pack includes many other icons. It adds those to the library, just to make use of the icon objects in some way. And then prints a `hello, world` message. So, the function of the program is trivial, only meant to exercise the build time tree-shaking functionality.

The initial goal of this repo was to demonstrate tree shaking with Webpack 4. That is, to show that when importing and using only a subset of icons, a production-optimized bundle will include only that subset and not the entire icon pack.
