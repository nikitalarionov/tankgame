const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: "bundle.js"
    },
    module: {
      rules: [
        { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        }
      ]
    },
    resolve: {
      modules: [
        path.join(__dirname, 'src'), 
        path.join(__dirname, 'node_modules'),
      ]
    },
    devtool: 'sourcemap'
};
