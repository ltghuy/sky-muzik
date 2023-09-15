const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@apis": path.resolve(__dirname, "src/apis"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@models": path.resolve(__dirname, "src/models"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@static": path.resolve(__dirname, "src/static"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};