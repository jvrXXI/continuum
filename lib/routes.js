var process = require('./process');

exports.order = function order(req, res, next) {
  var request = req.body;
  console.log("request: ", request);

  process.order(request, function(something, resultJson) {
    console.log("response", resultJson);
    res.json(resultJson);
  });
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}
