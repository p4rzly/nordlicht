const path = require('path');






module.exports = {



  entry: {

    Nordlicht: path.resolve(__dirname, 'src/nordlicht.js')

  },



  output: {

    filename: 'nordlicht.js',

    path: path.resolve(__dirname, './dist'),

    library: {
      name: "Nordlicht",
      type: "umd",
      export: 'default'
    }

  },


  devServer: {
    port: 8080,
    static: path.resolve(__dirname, './dist'),
    open: true,
    hot: true,
    historyApiFallback: true
  },

  mode: 'development'


};