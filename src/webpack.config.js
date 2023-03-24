module.exports = { 
    resolve: {
        fallback: {
            "fs": require.resolve("file-system")
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