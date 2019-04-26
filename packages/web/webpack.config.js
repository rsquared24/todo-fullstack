const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.tsx"
  },
  output: {
    filename: "./js/[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader" 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["vendors", "app"]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
				vendors: {
					test: /node_modules/,
					chunks: "all",
					name: "vendors"
				}
      }
    }
  }
}