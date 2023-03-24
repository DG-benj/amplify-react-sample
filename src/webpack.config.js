module.exports = { 
    resolve: {
        fallback: {
            "fs": require.resolve("file-system")
        }
    },
    experiments: {
        topLevelAwait: true
      }
}