module.exports = function (api) {
  api.cache(false)
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src/',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.test.tsx']
          }
        }
      ],
      'preval',
      'nativewind/babel',
      'module:react-native-dotenv',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin'
    ]
  }
}
