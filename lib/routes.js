exports.order = function order(req, res, next) {

  var amount = 0;
  var request = req.body;

  var pricesLength = request.prices.length;
  var amountLength = request.quantities.length;
  console.log("request: ", request);
  console.log(pricesLength);
  console.log(amountLength);

  if (pricesLength !== amountLength) {
  	res.json({});
  }

  function calculateBaseAmmount() {
  	for (var i=0; ((i<amountLength) && (i<pricesLength)); ++i) {
  		amount += request.prices[i] * request.quantities[i];
  		console.log(amount);
  	}
  }
  calculateBaseAmmount();

  function applyTaxes() {
    var taxes = {"DE":"1.2","UK":"1.21","FR":"1.2","IT":"1.25","ES":"1.19","PL":"1.21","RO":"1.2","NL":"1.2","BE":"1.24","EL":"1.2","CZ":"1.19","PT":"1.23","HU":"1.27","SE":"1.23","AT":"1.22","BG":"1.21","DK":"1.21","FI":"1.17","SK":"1.18","IE":"1.21","HR":"1.23","LT":"1.23","SI":"1.24","LV":"1.2","EE":"1.22","CV":"1.21","LU":"1.25","MT":"1.2"};
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
