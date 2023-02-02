const  webpack  = require("webpack")

module.exports = {
    entry: {
        main: "./src/sketch.js"
      },
    plugins: [
        new webpack.ProvidePlugin({
        p5: "p5"
        })
    ]
}