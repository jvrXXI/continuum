function calculateBaseAmmount(request) {
  var pricesLength = request.prices.length;
  var amountLength = request.quantities.length;	

  var amount = 0;
  for (var i=0; ((i<amountLength) && (i<pricesLength)); ++i) {
	amount += request.prices[i] * request.quantities[i];
  	// console.log(amount);
  }
  return amount;
}

function applyTax(countryCode, baseAmount) {
  var taxes = {"DE":"1.2","UK":"1.21","FR":"1.2","IT":"1.25","ES":"1.19","PL":"1.21","RO":"1.2","NL":"1.2","BE":"1.24","EL":"1.2","CZ":"1.19","PT":"1.23","HU":"1.27","SE":"1.23","AT":"1.22","BG":"1.21","DK":"1.21","FI":"1.17","SK":"1.18","IE":"1.21","HR":"1.23","LT":"1.23","SI":"1.24","LV":"1.2","EE":"1.22","CV":"1.21","LU":"1.25","MT":"1.2"};
  return baseAmount * taxes[countryCode];
}

function applyReduction(price, reductionType){	
	if (reductionType === "STANDARD") {
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
	}    
    return price;
}

// Validate input is correct, and return error msg if there is a mismatch
function validateOrderInput(input) {
  if ((!input.prices) || (!input.quantities) || (!input.names) || (!input.country) || (!input.reduction)) {
  	return "invalid input!";
  }
  var pricesLength = input.prices.length;
  var amountLength = input.quantities.length;
  var nbOfNames = input.names.length;
  if (pricesLength !== amountLength) {
  	return "mismatch between prices and quantities";
  }
  else if (pricesLength !== nbOfNames) {
  	return "mismatch between prices and product names";
  }

  return null;
}

exports.order = function order(input, onResult) {
  var amount = 0;
  if (validateOrderInput(input) !== null) {
	console.log("******" + validateOrderInput(input) + "******");
	onResult(null, {});
  }
  else {
	  amount = calculateBaseAmmount(input);
	  amount = applyTax(input.country, amount);
	  amount = applyReduction(amount, input.reduction);

	  onResult(null, {
	  	"total" : amount
	  });
	}
}
