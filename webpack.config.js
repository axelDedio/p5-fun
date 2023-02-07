const  webpack  = require("webpack")

module.exports = {
    entry: {
        main: "./src/sketch.js"
      },
      output: {

        clean: false,
      },
    plugins: [
        new webpack.ProvidePlugin({
        p5: "p5"
        })
    ],
    
}