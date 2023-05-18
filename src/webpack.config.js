module.exports = { 
  target : 'node',
    resolve: {
        fallback: {
            "fs": require.resolve("file-system"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "timers": require.resolve("timers-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "zlib": require.resolve("browserify-zlib"),
            "crypto": false,
        }
    },
    webpack: {
        configure: {
          experiments: {
            topLevelAwait: true,
          },
        },
      },
}