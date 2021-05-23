const withBundleAnalyzer = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (process.env.ANALYZE === "true") {
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: options.isServer
              ? "../analyze/server.html"
              : "./analyze/client.html",
          })
        );
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
};

const nextConfig = {
  env: require("./.env.js"),
};

module.exports = withBundleAnalyzer(nextConfig);
