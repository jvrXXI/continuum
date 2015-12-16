exports.order = function order(req, res, next) {

  var amount = 0;
  var request = req.body;

  var pricesLength = request.prices.length;
  var amountLength = request.quantities.length;

  if (pricesLength !== amountLength) {
  	res.json({});
  }

  function calculateBaseAmmount() {
  	for (var i=0; ((i<amountLength) && (i<pricesLength)); ++i) {
  		amount += request.prices[i] * request.quantities[i];
  	}
  }
  calculateBaseAmmount();

  function applyTaxes() {
  	var taxes = {
  		"DE" : 0.02
  	};
  	amount = taxes[request.country] * amount;
  }
  applyTaxes();

	function calculateReduction(price){
	    
	    var pe1 = 50000;
	    var pe2 = 10000;
	    var pe3 = 7000;
	    var pe4 = 5000;
	    var pe5 = 1000;
	    
	    if(price>pe1){
	        return price * 0.85;
	    }
	    else if(price>pe2){
	        return price * 0.9;
	    }
	    else if(price>pe3){
	        return price * 0.93;
	    }
	    else if(price>pe4){
	        return price * 0.95;
	    }
	    else if(price>pe5){
	        return price * 0.97;
	    }    
	    return price;
    }

    amount = calculateReduction(amount);

  res.json({
  	"total" : amount
  });
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}
