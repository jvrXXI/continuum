var process = require('./process');

exports.order = function order(req, res, next) {
  var request = req.body;

  var pricesLength = request.prices.length;
  var amountLength = request.quantities.length;
  console.log("request: ", request);
  // console.log(pricesLength);
  // console.log(amountLength);
  if (pricesLength !== amountLength) {
  	res.json({});
  }

  process.order(request, function(something, resultJson) {
    res.json(resultJson);
  });
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}
