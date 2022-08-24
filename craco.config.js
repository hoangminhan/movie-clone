const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@menu-bg": "#0d0c0f",
              "@menu-collapsed-width": "100px",
              "@menu-item-active-bg": "#1f2737",
              "@menu-item-color": "#bdc8f0",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
