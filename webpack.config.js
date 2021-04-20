const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "src", "style.css"),
        path.join(__dirname, "src", "index.js"),
    ],
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
    },
    performance: {
        hints: false,
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
            "/socket.io": {
                target: "http://localhost:3001",
                ws: true,
            },
        },
        port: "3000",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
    ],
});
