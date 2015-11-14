var urlencode = require("urlencode");
var myurl = {}

myurl.decodeParams = function(params){
  var params = params.match(/[^&?]+=[^&?]+/g)
  var result = {}
  for(var i=0;i<params.length;i++){
    var tmp = params[i].split("=");
    result[tmp[0]]= urlencode.decode(tmp[1]);
  }
  return result;
}

/// test case 
//var result =  myurl.decodeParams("first=true&pn=1&kd=3");
//console.log(result);

myurl.encodeParams = function(params){
  var result = "";
  if(arguments.length <= 1){
    for(var k in params){
      result = result.length > 0 ?result + "&": result;
      result += k + "=" + urlencode(params[k]);
    }
    return result;
  }
  else{
    for(var i=1;i<arguments.length;i++){
      result = result.length > 0 ?result + "&": result;
      result += arguments[i] + "=" +　urlencode(params[arguments[i]]);
    }
    return result;
  }

}

// encodeParams test
//var result = myurl.encodeParams({"aa":"bb","cc":"dd"},"aa"); // case 1
// var result = myurl.encodeParams({"aa":"bb","cc":"dd"},"aa"); // case 2
//console.log(result);



module.exports = myurl;