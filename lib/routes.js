exports.order = function order(req, res, next) {

  var amount = 0;
  var request = req.body;

  function calculateBaseAmmount() {
  	var pricesLength = request.prices.length;
  	var amountLength = request.quantities.length;

  	for (var i=0; ((i<amountLength) && (i<pricesLength); ++i) {
  		amount += request.prices[i] : request.quantities[i];
  	}
  }
  calculateBaseAmmount();

  function applyTaxes() {
  	var taxes = {
  		"DE" : 10.5
  	};
  	amount = taxes[request.country] * amount;
  }
  applyTaxes();

  function applyDeduction() {

  }
  applyDeduction();

  res.json({
  	"total" : amount
  });
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}
