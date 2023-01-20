const  webpack  = require("webpack")

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
        p5: "p5"
        })
    ]
}