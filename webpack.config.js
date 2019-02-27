module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './codex.misprints.js',
    library: 'Codex.misprints',
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
