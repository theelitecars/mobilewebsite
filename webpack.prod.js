const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{ 
							loader: "css-loader",
							options: { importLoaders: 1 }
						},
						{
							loader: "postcss-loader"
						},
						{ 
							loader: "sass-loader"
						}
					],
					fallback: "style-loader",
					publicPath: "../"
				})
			}
		]
	},
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new ExtractTextPlugin({
			filename: 'css/style.css'
		})
	]
})