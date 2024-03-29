const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@models": path.resolve(__dirname, "src/models"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@route": path.resolve(__dirname, "src/route"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@services": path.resolve(__dirname, "src/services"),
      "@static": path.resolve(__dirname, "src/static"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};