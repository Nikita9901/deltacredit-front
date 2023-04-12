const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@moneylend-ui": path.resolve(__dirname, "src/moneylend-ui"),
    },
  },
};
