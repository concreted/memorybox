module.exports = routes;

function routes(app) {
  app.get('/', function(req, res) {
    res.send('Hello world');
  });
}