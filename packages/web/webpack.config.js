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
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}