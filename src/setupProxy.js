const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the endpoint you want to proxy (e.g., '/api')
    createProxyMiddleware({
      target: 'http://localhost:4000', // Specify your Express server's URL and port
      changeOrigin: true,
    })
  );
};
