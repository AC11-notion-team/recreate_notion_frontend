const purgecss = require('@fullhuman/postcss-purgecss')
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    plugins: [
      purgecss({
        content: ['./**/*.html']
      }),
    ]
  },
}
