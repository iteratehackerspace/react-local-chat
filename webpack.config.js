module.exports = {
  entry: './lib/chat.jsx',
  devServer:{
    inline:true,
    progress:true,
    contentBase:'public',
    historyApiFallback: true
  },
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module:{
    loaders:[{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude:/node_modules/,
      include: `${__dirname}/lib`,
      query: {
        // Here you can put plugins, like plugins:['transform-runtime']
        presets: ['es2015', 'react', 'stage-3', 'stage-0']
      }
    }]
  }
};
