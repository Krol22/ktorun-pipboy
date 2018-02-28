var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractSass = new ExtractTextPlugin('style.css');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: __dirname,
        port: 3000
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
        },  {
            test: /\.wav$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        extractSass
    ]
};
