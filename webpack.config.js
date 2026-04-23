const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  // other config...
  plugins: [
    // Only run GenerateSW in production
    ...(process.env.NODE_ENV === "production" ? [new GenerateSW()] : []),
  ],
};
