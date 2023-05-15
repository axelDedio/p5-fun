const webpack = require("webpack");

module.exports = {
    entry: {
        main: "./src/sketch.js",
    },
    plugins: [
        new webpack.ProvidePlugin({
            p5: "p5",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(vert|frag)$/,
                use: "raw-loader",
            },
        ],
    },
};
