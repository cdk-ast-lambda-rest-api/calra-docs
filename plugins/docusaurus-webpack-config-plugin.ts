// See https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis
import { Configuration } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";

module.exports = function () {
  return {
    name: "loaders",
    configureWebpack(): Partial<Configuration> {
      return {
        plugins: [new ESLintPlugin()],
      };
    },
  };
};
