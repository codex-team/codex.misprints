module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './misprints.js',
    library: 'Misprints',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  resolve: {
      extensions: ['.ts']
  }
};
