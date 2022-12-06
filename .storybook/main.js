const { config } = require("@storybook/addon-actions");
const path = require('path')
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      options: {
        craOverrides: {
        fileLoaderExcludes: ["less"]
        }
      }
    }
    // '@storybook/preset-scss'
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            configureJSX: true,
          }
        }]
    });
    return config;
  },
}