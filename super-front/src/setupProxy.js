const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: process.env.REACT_APP_URL_BACKEND,
            changeOrigin: true,
        })
    );
};
