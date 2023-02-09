require('dotenv').config();
const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { GRAPHQL_URL } = process.env;

module.exports = {
	target: 'web',
	mode: 'production',
	entry: './src/index.tsx',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				include: path.resolve(__dirname, "src"),
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				GRAPHQL_URL: `"${GRAPHQL_URL}"`
			}
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, "public/index.html")
		})
	],
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build/'),
		publicPath: "/"
	}
};